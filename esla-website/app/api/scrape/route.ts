import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { put } from '@vercel/blob'
import { createMatch, getAllMatches, updateMatch } from '@/lib/kv'
import { canonicalMatchKey, canonicalTime, normalizeMatchPayload } from '@/lib/match'

export const dynamic = 'force-dynamic'

type TeamSource = { team_name: string; url: string }

type Score = { home: number | null; away: number | null; pen_home: number | null; pen_away: number | null }

type MatchItem = {
  match_id: string | null
  date: string | null
  kickoff_iso: string | null
  competition: string | null
  round: string | null
  home_team: string
  away_team: string
  status: 'finished' | 'scheduled'
  score: Score
  location: string | null
  notes: string | null
}

type TeamResult = { team_name: string; source_url: string; matches: MatchItem[] }
type SourceError = { team_name: string; source_url: string; status?: number; message: string }

function parseScore(str?: string | null): Score {
  if (!str) return { home: null, away: null, pen_home: null, pen_away: null }
  const m = String(str).trim().match(/(\d+)\s*[:–-]\s*(\d+)/)
  if (!m) return { home: null, away: null, pen_home: null, pen_away: null }
  return { home: parseInt(m[1], 10), away: parseInt(m[2], 10), pen_home: null, pen_away: null }
}

function clean(t?: string | null): string {
  return (t || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

function toIsoDate(input: string | null): string | null {
  if (!input) return null
  const s = clean(input)
  // Accept formats like "02.11.2025", "02.11.25", optionally prefixed with weekday
  const m = s.match(/(?:^(?:Mo|Di|Mi|Do|Fr|Sa|So)\s+)?(\d{1,2})[.\/-](\d{1,2})(?:[.\/-](\d{2,4}))?/i)
  if (!m) return null
  const dd = String(parseInt(m[1], 10)).padStart(2, '0')
  const mm = String(parseInt(m[2], 10)).padStart(2, '0')
  let yyyy = m[3] ? m[3] : String(new Date().getFullYear())
  if (yyyy.length === 2) yyyy = String(2000 + parseInt(yyyy, 10))
  return `${yyyy}-${mm}-${dd}`
}

async function fetchHtml(url: string): Promise<string> {
  const { data } = await axios.get<string>(url, {
    timeout: 15000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8',
      'Referer': 'https://matchcenter.ifv.ch/'
    },
    responseType: 'text',
    withCredentials: false,
    validateStatus: (s: number) => s >= 200 && s < 400,
  })
  return data
}

function selectCompetition($: cheerio.CheerioAPI): string | null {
  const h2 = clean($('h2').first().text())
  if (h2) return h2
  const h3 = clean($('h3').first().text())
  return h3 || null
}

function extractMatches($: cheerio.CheerioAPI): MatchItem[] {
  const comp = selectCompetition($)
  const rows = $('tr.matchRow, tr[data-matchid]')
  const list: MatchItem[] = []
  if (rows.length === 0) return list
  rows.each((_: number, el: any) => {
    const row = $(el)
    const matchId = row.attr('data-matchid') || null
    const dateText = clean(row.find('.date').text()) || null
    const home = clean(row.find('.homeTeam').text()) || clean(row.find('td').eq(1).text())
    const away = clean(row.find('.awayTeam').text()) || clean(row.find('td').eq(3).text())
    const scoreText = clean(row.find('.score').text()) || clean(row.find('td').filter((__: number, c: any) => /(\d+)\s*[:–-]\s*(\d+)/.test($(c).text())).first().text())
    // Try to extract a location using common class names or a later table cell
    const locCandidate =
      clean(row.find('.location').text()) ||
      clean(row.find('.venue').text()) ||
      clean(row.find('.platz').text()) ||
      clean(row.find('td').eq(4).text()) ||
      null
    const sc = parseScore(scoreText || null)
    const rowLower = clean(row.text()).toLowerCase()
    const isForfait = /\bforfait\b/.test(rowLower) || /\bff\b/.test(rowLower)
    const status: 'finished' | 'scheduled' = (sc.home !== null && sc.away !== null) || isForfait ? 'finished' : 'scheduled'
    if (!home || !away) return
    list.push({
      match_id: matchId,
      date: dateText,
      kickoff_iso: null,
      competition: comp,
      round: null,
      home_team: home,
      away_team: away,
      status,
      score: sc,
      location: locCandidate || null,
      notes: isForfait ? 'forfait' : null,
    })
  })
  return list
}

function jitter(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cronHeader = request.headers.get('x-vercel-cron')
    const isCron = !!cronHeader
    const ingest = isCron || searchParams.get('ingest') === '1' || searchParams.get('ingest') === 'true'
    const debug = searchParams.get('debug') === '1' || searchParams.get('debug') === 'true'
    const sources: TeamSource[] = [
      { team_name: 'Elitesoccer ESLA D-7', url: 'https://matchcenter.ifv.ch/default.aspx?v=1761431&oid=7&lng=1&t=76565&a=pt' },
      { team_name: 'Elitesoccer ESLA D-9', url: 'https://matchcenter.ifv.ch/default.aspx?v=1761431&oid=7&lng=1&t=77407&a=pt' },
      { team_name: 'Elitesoccer ESLA D-9 Gruppe', url: 'https://matchcenter.ifv.ch/default.aspx?oid=7&lng=1&v=1761431&t=77407&ls=24852&sg=68624&a=tag' },
      { team_name: 'Elitesoccer ESLA D-9 Gruppe (pt)', url: 'https://matchcenter.ifv.ch/default.aspx?oid=7&lng=1&v=1761431&t=77407&ls=24852&sg=68624&a=pt' },
      { team_name: 'Elitesoccer ESLA D-7 Gruppe', url: 'https://matchcenter.ifv.ch/default.aspx?oid=7&lng=1&v=1761431&t=76565&ls=24817&sg=68539&a=tag' },
      { team_name: 'Elitesoccer ESLA EA', url: 'https://matchcenter.ifv.ch/default.aspx?oid=7&lng=1&v=1761431&t=76566&ls=24799&sg=68485&a=tag' },
      { team_name: 'Elitesoccer ESLA EA (pt)', url: 'https://matchcenter.ifv.ch/default.aspx?oid=7&lng=1&v=1761431&t=76566&ls=24799&sg=68485&a=pt' },
    ]

    const teams: TeamResult[] = []
    const errors: SourceError[] = []
    for (let i = 0; i < sources.length; i++) {
      const { team_name, url } = sources[i]
      try {
        const html = await fetchHtml(url)
        const $ = cheerio.load(html)
        const matches = extractMatches($)
        teams.push({ team_name, source_url: url, matches })
      } catch (e: any) {
        teams.push({ team_name, source_url: url, matches: [] })
        errors.push({ team_name, source_url: url, status: e?.response?.status, message: e?.message || 'fetch failed' })
      }
      if (i < sources.length - 1) await jitter(300 + Math.floor(Math.random() * 900))
    }

    let body: any = {
      last_checked: new Date().toISOString(),
      schedule: '0 9 * * *',
      source: {
        origin: 'IFV Matchcenter',
        url: 'https://matchcenter.ifv.ch'
      },
      disclaimer: 'Daten werden täglich automatisch vom IFV Matchcenter aktualisiert. © Innerschweizer Fussballverband (IFV). Öffentliche Daten, nur zu Informationszwecken für Vereinswebsites.',
      teams,
      summary: {
        totalMatches: teams.reduce((sum, t) => sum + (t.matches?.length || 0), 0),
        perTeam: teams.map(t => ({ team: t.team_name, count: t.matches.length }))
      }
    }

    if (ingest) {
      const before = await getAllMatches()
      const byKey = new Map<string, any>()
      for (const ex of before) {
        const kExact = canonicalMatchKey(ex)
        byKey.set(kExact, ex)
        const t = canonicalTime(ex.time)
        if (t && t !== '00:00') {
          const zero = canonicalMatchKey({ ...ex, time: undefined as any })
          if (!byKey.has(zero)) byKey.set(zero, ex)
        }
      }

      let added = 0
      let updated = 0
      let skipped = 0

      // Flatten scraped matches to our Match-like payloads
      const flat: Array<Partial<import('@/types').Match>> = []
      for (const t of teams as TeamResult[]) {
        for (const m of t.matches) {
          const iso = toIsoDate(m.date)
          if (!iso) { skipped++; continue }
          const hasHome = typeof m.score?.home === 'number'
          const hasAway = typeof m.score?.away === 'number'
          const payload: Partial<import('@/types').Match> = {
            date: iso,
            homeTeam: m.home_team,
            awayTeam: m.away_team,
            time: undefined,
            homeScore: hasHome ? m.score!.home! : undefined,
            awayScore: hasAway ? m.score!.away! : undefined,
            competition: m.competition || undefined,
            location: m.location || undefined,
            notes: m.notes || undefined,
            status: hasHome && hasAway ? 'finished' : 'upcoming',
          }
          const normalized = normalizeMatchPayload(payload)
          flat.push({ ...payload, ...normalized })
        }
      }

      for (const m of flat) {
        const key = canonicalMatchKey({ date: m.date!, time: m.time, homeTeam: m.homeTeam!, awayTeam: m.awayTeam! })
        const zero = canonicalMatchKey({ date: m.date!, time: undefined, homeTeam: m.homeTeam!, awayTeam: m.awayTeam! })
        const ex = byKey.get(key) || byKey.get(zero)
        if (ex) {
          const updates: Partial<import('@/types').Match> = {}
          let changed = false
          if (m.competition && m.competition !== ex.competition) { updates.competition = m.competition; changed = true }
          if (typeof m.homeScore === 'number' && (ex.homeScore === null || typeof ex.homeScore !== 'number')) { updates.homeScore = m.homeScore; changed = true }
          if (typeof m.awayScore === 'number' && (ex.awayScore === null || typeof ex.awayScore !== 'number')) { updates.awayScore = m.awayScore; changed = true }
          if (m.location && m.location !== ex.location) { updates.location = m.location; changed = true }
          if ((m as any).notes && (m as any).notes !== ex.notes) { (updates as any).notes = (m as any).notes; changed = true }
          if (m.time && m.time !== ex.time) { updates.time = m.time; changed = true }
          if (changed) {
            updates.status = (typeof (updates.homeScore ?? ex.homeScore) === 'number' && typeof (updates.awayScore ?? ex.awayScore) === 'number') ? 'finished' : (ex.status || 'upcoming')
            await updateMatch(ex.id, updates)
            updated++
          } else {
            skipped++
          }
        } else {
          await createMatch(m as any)
          // keep maps in sync to avoid duplicates in same batch
          byKey.set(key, { ...m, id: Date.now().toString() })
          byKey.set(zero, { ...m, id: Date.now().toString() })
          added++
        }
      }

      const after = await getAllMatches()
      body.ingest = true
      body.ingestSummary = {
        added, updated, skipped,
        totalBefore: before.length,
        totalAfter: after.length,
      }
    } else {
      body.ingest = false
    }
    if (debug) {
      body.errors = errors
    }

    let blob_url: string | null = null
    try {
      const saved = await put('feeds/ifv-esla.json', JSON.stringify(body, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/json; charset=utf-8',
      })
      blob_url = saved.url
    } catch (_) {
      // ignore blob persistence errors (e.g., missing token)
    }

    return NextResponse.json({ ...body, blob_url }, { headers: { 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' } })
  } catch (err) {
    return NextResponse.json({ error: 'Scrape failed' }, { status: 500 })
  }
}

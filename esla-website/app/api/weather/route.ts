import { NextRequest, NextResponse } from 'next/server';

function toISO(date: string, time?: string) {
  const t = time && time.length >= 4 ? time : '12:00';
  return `${date}T${t}:00`;
}

function pickHourlyIndex(times: string[], targetISO: string) {
  let best = 0;
  let bestDiff = Number.POSITIVE_INFINITY;
  const target = new Date(targetISO).getTime();
  for (let i = 0; i < times.length; i++) {
    const ts = new Date(times[i]).getTime();
    const d = Math.abs(ts - target);
    if (d < bestDiff) { bestDiff = d; best = i; }
  }
  return best;
}

const codeMap: Record<number, { label: string; emoji: string }> = {
  0: { label: 'Klar', emoji: '☀️' },
  1: { label: 'Meist klar', emoji: '🌤️' },
  2: { label: 'Wolkig', emoji: '⛅' },
  3: { label: 'Bewölkt', emoji: '☁️' },
  45: { label: 'Nebel', emoji: '🌫️' },
  48: { label: 'Nebel', emoji: '🌫️' },
  51: { label: 'Niesel', emoji: '🌦️' },
  53: { label: 'Niesel', emoji: '🌦️' },
  55: { label: 'Niesel', emoji: '🌦️' },
  61: { label: 'Regen', emoji: '🌧️' },
  63: { label: 'Regen', emoji: '🌧️' },
  65: { label: 'Starker Regen', emoji: '🌧️' },
  66: { label: 'Gefrierender Regen', emoji: '🌧️' },
  67: { label: 'Gefrierender Regen', emoji: '🌧️' },
  71: { label: 'Schnee', emoji: '❄️' },
  73: { label: 'Schnee', emoji: '❄️' },
  75: { label: 'Schnee', emoji: '❄️' },
  80: { label: 'Schauer', emoji: '🌦️' },
  81: { label: 'Schauer', emoji: '🌦️' },
  82: { label: 'Schauer', emoji: '🌦️' },
  95: { label: 'Gewitter', emoji: '⛈️' },
  96: { label: 'Gewitter', emoji: '⛈️' },
  99: { label: 'Gewitter', emoji: '⛈️' },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get('lat') || '47.0502');
  const lon = parseFloat(searchParams.get('lon') || '8.3093');
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&timezone=auto`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) return NextResponse.json({ error: 'weather_fetch_failed' }, { status: 500 });
  const data = await res.json();

  const currentCode = (data?.current?.weather_code ?? null) as number | null;
  const currentTemp = (data?.current?.temperature_2m ?? null) as number | null;
  const current = currentCode != null && currentTemp != null
    ? { temperature: Math.round(currentTemp), code: currentCode, ...codeMap[currentCode] }
    : null;

  let forecast: any = null;
  if (date) {
    const times: string[] = (data?.hourly?.time ?? []).map((t: string) => t.endsWith(':00') ? t : `${t}:00`);
    const idx = pickHourlyIndex(times, toISO(date, time || '12:00'));
    const t = data?.hourly?.temperature_2m?.[idx];
    const c = data?.hourly?.weather_code?.[idx];
    if (typeof t === 'number' && typeof c === 'number') {
      forecast = { temperature: Math.round(t), code: c, ...codeMap[c], time: times[idx] };
    }
  }

  return NextResponse.json({ current, forecast, lat, lon });
}

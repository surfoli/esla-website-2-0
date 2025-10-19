# ESLA Website 2.0
Website von Team Elitesoccer (ESLA) – Next.js 15, Tailwind CSS.

## Voraussetzungen
- Node.js ≥ 18
- npm ≥ 10

## Entwicklung starten
```bash
npm ci
npm run dev
# Dev-Server: http://127.0.0.1:3000
### Nützliche Skripte
- `npm run dev:3000` – Start auf Port 3000 (127.0.0.1)
- `npm run dev:clean` – Ports 3000/3001/3002/4000 freiräumen, Cache löschen, dann dev starten
- `npm run build` – Produktions-Build
- `npm run start` – Startet den Build (Port 3000)
- `npm run start:4000` – Start auf Port 4000

## Umgebungsvariablen
- `NEXT_PUBLIC_SITE_URL` (optional) – wird in `app/layout.tsx` für `metadataBase` verwendet.
- `ADMIN_PASSWORD` – Passwort für Admin-Login (`/login`).
- `BLOB_READ_WRITE_TOKEN` – Token für Vercel Blob Uploads (siehe Abschnitt „Uploads“).

## Deployment
Empfohlen: Vercel
1) Repo verbinden
2) Projekt importieren (`esla-website/` als Root)
3) Node 18+ Runtime
4) Build Command: `npm run build`, Output: `.next`

Selbst-Hosting:
```bash
npm ci
npm run build
npm run start
```

## Bilder
- Assets liegen unter `public/images/`.
- Team-Seite nutzt Hochformat (3:4) mit `object-top` Crop.

## Admin-Login & Schutz
- Seiten unter `app/admin/` sind via `middleware.ts` geschützt (Cookie `esla_admin`).
- Login unter `/login` mit `ADMIN_PASSWORD`.
- Logout-Button ist auf Admin-Seiten vorhanden; alternativ per `POST /api/auth/logout`.

## Uploads (Vercel Blob)
- API: `POST /api/upload` (multipart/form-data: Feld `file` und optional `dir`)
- Antwort enthält `url`, die direkt als `logoUrl` im Team gespeichert werden kann.
- Voraussetzung: `@vercel/blob` in Dependencies und ENV `BLOB_READ_WRITE_TOKEN`.
  - Token via Vercel Dashboard oder CLI anlegen und als Environment Variable hinterlegen.

## Team-Seite
- Filter enthält zusätzlich „SPIELER“ (Aggregat aller Spieler) und ist Standardansicht.
- Direktlink Staff: `/team?section=staff` • Spieler: `/team?section=players`

## Code-Qualität
- Tailwind + Autoprefixer via `postcss.config.mjs`
- ESLint: `npm run lint` (bei Bedarf konfigurieren)

## Git/Branching
- Haupt-Branch: `main`
- Push nach GitHub: `git push -u origin main`

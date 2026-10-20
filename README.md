# SEPL Next.js Frontend

Public website migrated from `New-React` (Vite) → Next.js App Router. UI is unchanged.

## Run

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

## Data flow

1. Pages load with **dummy/static data** from `src/lib/*Data.js` / `src/lib/data.js`.
2. Client hooks call `/api/*` (same origin).
3. If MongoDB has published records, those **replace** the dummy data.
4. If Mongo is empty or offline, APIs return `[]` and the UI keeps dummy data.

## Env

Copy `.env.local.example` → `.env.local` (already seeded for local Mongo if present).

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Same cluster as admin |
| `JWT_SECRET` / SMTP_* | Lead emails (optional) |
| `NEXT_PUBLIC_API_URL` | Leave empty for same-origin `/api` |

Admin CRUD lives in `next-js-admin-panel`. Both apps share the same MongoDB.

# NoteFlow

A private note-taking app: capture it, find it, manage it.

Next.js (App Router) · React · TypeScript · Tailwind CSS · Auth.js · Prisma · PostgreSQL

## Getting started

```bash
npm install
cp .env.example .env        # fill DATABASE_URL and AUTH_SECRET
npx auth secret             # writes AUTH_SECRET
npm run db:migrate          # creates the User and Note tables
npm run db:seed             # optional demo account
npm run dev
```

Demo account after seeding: `demo@noteflow.app` / `Password123!`

## How the code is laid out

| Path | What lives there |
|---|---|
| `app/(auth)` | Login and sign-up pages (public) |
| `app/(dashboard)` | Every authenticated screen; the layout calls `requireUser()` |
| `app/api/auth/[...nextauth]` | Auth.js route handlers |
| `components/` | Presentational and form components |
| `lib/auth.ts` | Auth.js configuration (credentials provider) |
| `lib/session.ts` | `requireUser()` — the one place a page asks "who is this?" |
| `lib/notes.ts` | Data access. Every function takes `userId` first |
| `lib/actions/` | Server Actions called by forms |
| `lib/validations.ts` | Zod schemas shared by client and server |
| `prisma/schema.prisma` | Database schema |
| `tickets/` | The build plan, split into epics and tickets |

## Security model in one paragraph

Middleware redirects visitors without a session cookie, but it is only a convenience.
The real checks are server-side: every page and action calls `requireUser()`, and every
query in `lib/notes.ts` is scoped by `userId`. Writes use `updateMany` / `deleteMany`
filtered on `{ id, userId }`, so a note id belonging to someone else matches zero rows.
Reads on another user's note return the 404 screen, so ids cannot be probed.

## Working the tickets

Start at `tickets/README.md`. Tickets are grouped by area (foundation, database,
authentication, authorization, notes, search, pinning, UX, deployment) and carry
dependencies, execution steps and acceptance criteria. Files in this repo already
reference their ticket id in a comment where work is expected.

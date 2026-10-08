# NoteFlow — Project Journal

## What this app is

NoteFlow is a private note-taking app: capture it, find it, manage it.

- **Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS · Firebase Auth · Firestore
- **Auth:** email/password sign-in via the Firebase Identity Toolkit on the server; the
  returned ID token is exchanged for a 14-day httpOnly Firebase session cookie
  (`__session`). Every protected page and server action verifies it with `requireUser()`.
- **Data:** notes live in Firestore, accessed only through `lib/notes.ts`, where every
  function is scoped by `userId`. Writes re-read the target document and throw
  `NotAuthorizedError` on ownership mismatch; reads of another user's note return 404.
  Firestore rules deny all direct client access, so the Admin SDK behind the ownership
  checks is the only write path.
- **Features:** create / view / edit / delete notes, URL-backed search over title and
  content (debounced, with a no-results state), pinning with a pinned group, loading
  skeletons and pending submit buttons, centralised auth error copy, empty and error
  states, light/dark theme, route protection, logout.
- **Layout:** `app/(auth)` public login and sign-up, `app/(dashboard)` authenticated
  screens, `components/` UI, `lib/` session, data and server actions, `scripts/seed.ts`
  demo seed, `tickets/` the build plan grouped by epic.

Run it with `npm install`, `cp .env.example .env` (fill the `FIREBASE_*` vars),
`npm run dev`; optionally `npm run seed` for the demo account
`demo@noteflow.app` / `Password123!`.

## Change journal

Newest first. Ticket ids match the entries in `tickets/`.

### 2026-10-06

- **UX-007** — landing page reduced to a single "Get started" call to action; the
  secondary "log in" link was dropped, and the headline is now clamped to one line
  (`whitespace-nowrap` + `clamp()` sizing). Note: a returning visitor no longer has a
  route to `/login` from the landing page.
- **DEP-001** — duplicate-signup detection now checks the Admin SDK code
  `auth/email-already-exists` instead of the client SDK's
  `auth/email-already-in-use`, which never occurs on this path.
- **Repo** — `auth-flows` merged into `main` (PR #2 squash kept in history); `main`
  content is identical to `auth-flows`.

### 2026-10-01

- **UX-008** — light and dark theme with a toggle (`components/ThemeToggle.tsx`,
  `lib/theme-constants.ts`).
- Design pass — frameless elevated containers, pinned-note indicator, glass logout
  button.

### 2026-09-30

- **FND-003** — Next is served through a custom `server.js` so every request is logged
  (`lib/log.ts`, `nodemon.json`).
- **DEP-005** — Firebase CLI config (`firebase.json`, `.firebaserc`), deny-all
  Firestore rules and a provisioning ticket.
- **DEP-001** — backend swap: Prisma/PostgreSQL + Auth.js replaced with Firebase Auth
  and Firestore. `prisma/`, `lib/auth.ts`, `lib/prisma.ts`, the NextAuth route and
  `types/next-auth.d.ts` were removed; `lib/firebase.ts` and `lib/session.ts` take
  their place.

### 2026-09-28

- **PR #2** — "Auth flows" squash-merged into `main`.

### 2026-09-24

- **DEP-001/002** — production DB config (`directUrl`, env docs), README deployment
  sections, verified UX-003..007 criteria ticks.
- **DEP-002** — verified that the build script runs `prisma generate`.

### 2026-09-23

- **UX-001** — acceptance criteria ticked after verification.
- **UX-002** — loading skeletons, pending submit buttons, search pending hint.
- **PIN-001..002** — pin toggle from the card and the note page, pinned grouping with
  indicator.
- **SRCH-001..003** — URL-backed search with debounce, title/content filtering and a
  no-results state.
- **AUTH-001..006** — acceptance criteria ticked after live verification.
- **NOTE-001..005** — create, list, view, edit and delete notes.
- **AUTHZ-001..004** — ownership data layer, read/write enforcement, IDOR test matrix.
- **AUTH-007** — centralised auth error copy, ARIA wired on forms.

### 2026-09-21

- **AUTH-003..006** — registration, login, route protection, logout.

### 2026-09-20

- **DB-002** — User and Note schema migration.

### 2026-09-19

- **FND-001** — Next.js 15 project initialised.

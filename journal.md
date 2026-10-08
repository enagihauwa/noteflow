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

---

## Journal

Newest first. Each entry follows the same order: what was worked on, what changed,
decisions taken, what was learned. Ticket ids match the entries in `tickets/`.

### 2026-10-06 — Landing page CTA, duplicate-signup fix, branch consolidation

**What was worked on**

- **UX-007** — finishing the landing page.
- **DEP-001** — a signup bug where a duplicate email did not produce the right error.
- Getting the two branches (`main`, `auth-flows`) into one consistent state on GitHub.

**What changed**

- `app/page.tsx`: two calls to action reduced to one "Get started" button pointing at
  `/signup`; the headline is clamped to a single responsive line
  (`whitespace-nowrap` + `clamp()`), replacing the old `max-w-[16ch]` wrap.
- `tickets/07-ux-quality/UX-007-landing-page.md`: steps and acceptance criteria updated
  to describe the single action.
- `lib/actions/auth-actions.ts`: duplicate detection switched to the Admin SDK code
  `auth/email-already-exists`, with a comment recording why the client SDK's
  `auth/email-already-in-use` never fires on this path.
- New `journal.md` (this file).
- `main` advanced from `7b0d25d` to include all of `auth-flows` (20 commits).

**Decisions**

- One clear call to action instead of "Create an account" + "Log in" — cleaner page,
  with the tradeoff (documented in the ticket) that a returning visitor must now reach
  `/login` directly or via `/signup`.
- Merged PR #2's squash commit into `main` rather than force-pushing over it, so the
  existing history stays intact.
- In the merge, every conflict was resolved in favour of `auth-flows` content, and
  stale files the old squash re-introduced were deleted again: the Prisma/NextAuth
  leftovers (`prisma/`, `lib/auth.ts`, `lib/prisma.ts`, `types/next-auth.d.ts`, the
  NextAuth route), a duplicated `safeRedirectTo` function, and an obsolete README
  paragraph about NextAuth JWT sessions. Verified by comparing trees — `main` ended up
  byte-identical to `auth-flows` (`f54b07b`).

**Learned**

- The Firebase Admin SDK reports duplicate emails as `auth/email-already-exists`;
  `auth/email-already-in-use` is the client SDK code and does not appear here.
- The repo has a "changes must go through a pull request" rule on `main`; pushes are
  possible with bypass rights, and GitHub occasionally answers the first push with a
  500 — a retry succeeds.
- PR #2 had squash-merged an *early* snapshot of `auth-flows`, so the two branches had
  quietly diverged; a plain fast-forward was never going to work.

### 2026-10-01 — Theme and visual polish

**What was worked on**

- **UX-008** — light and dark theme.
- A design pass over the existing screens.

**What changed**

- Added `components/ThemeToggle.tsx` and `lib/theme-constants.ts`; tokens in
  `app/globals.css` gained light and dark values.
- Frameless elevated containers, a pinned-note indicator, and a glass-style logout
  button in the navbar.

**Decisions**

- Colours are driven by CSS custom properties so a theme switch is a class change, not
  a rewrite of every component.

**Learned**

- Keeping theme values in one constants file keeps the toggle honest — no component
  hard-codes a colour.

### 2026-09-30 — Backend swap to Firebase, request logging, provisioning

**What was worked on**

- **DEP-001** — replacing Prisma/PostgreSQL + Auth.js with Firebase Auth and Firestore.
- **DEP-005** — Firebase CLI config and deny-all Firestore rules.
- **FND-003** — making every request visible in the logs.

**What changed**

- Removed `prisma/` (schema, migrations, seed), `lib/auth.ts`, `lib/prisma.ts`,
  `app/api/auth/[...nextauth]/route.ts` and `types/next-auth.d.ts`.
- Added `lib/firebase.ts` (Admin SDK init, REST sign-in, session-cookie helpers),
  `lib/session.ts` (`requireUser()` / `getSession()`), `lib/session-constants.ts` and
  `scripts/seed.ts`.
- Added `firebase.json`, `.firebaserc` and `firebase/firestore.rules` (deny all direct
  client access).
- Added `server.js` + `nodemon.json` so Next is served through a custom server, with
  `lib/log.ts` logging every request.
- README rewritten around the Firebase setup, session model and deployment.

**Decisions**

- Firebase is the production backend, so there is **no separate database to
  provision** — the development Firestore project is also the production one.
- Deny-all Firestore rules: the browser never talks to the database directly; the only
  write path is the Admin SDK behind the ownership checks.
- Sessions are server-verified cookies (`requireUser()`), not middleware-only checks —
  middleware redirects are a convenience, the real gate is on every page and action.

**Learned**

- Swapping the persistence layer touched far less than expected once all reads and
  writes already funneled through one data-access module (`lib/notes.ts`).

### 2026-09-28 — PR #2 merged

**What was worked on**

- Landing the `auth-flows` branch through a pull request.

**What changed**

- `main` received the squash commit `7b0d25d Auth flows (#2)`.

**Decisions**

- Squash merge for the PR, keeping `main`'s early history small.

**Learned**

- The squash snapshot did not include everything that later landed on `auth-flows`,
  which is what made the branches diverge (see 2026-10-06).

### 2026-09-24 — Deployment configuration verified

**What was worked on**

- **DEP-001/002** — production database config, environment docs, README deployment
  sections.
- Verifying the build really runs `prisma generate`.

**What changed**

- `directUrl`/production DB config, `.env.example` and README deployment sections.
- Acceptance criteria for UX-003..007 ticked after verification.
- Build script confirmed to run `prisma generate` (later made irrelevant by the
  Firebase swap).

**Decisions**

- Tick acceptance criteria only after the behaviour has actually been exercised, not
  when the code is written.

**Learned**

- Reading the build log for warnings, not just the success line, catches missing
  generation steps.

### 2026-09-23 — Notes, search, pinning, authorization and UX quality

**What was worked on**

- **NOTE-001..005** — create, list, view, edit, delete notes.
- **AUTHZ-001..004** — ownership data layer, read/write enforcement, IDOR test matrix.
- **SRCH-001..003** — search.
- **PIN-001..002** — pinning.
- **UX-001..002** — empty states, loading states; **AUTH-007** — centralised auth error
  copy and ARIA on forms.

**What changed**

- Full CRUD on notes; every data function takes `userId` first.
- Writes read the target document first and throw `NotAuthorizedError` on an owner
  mismatch; reads of someone else's note return the 404 screen.
- URL-backed, debounced search filtering title and content, with a no-results state and
  a pending hint.
- Pin toggle from the card and the note page, pinned notes grouped with an indicator.
- Loading skeletons, pending submit buttons, empty states, shared error copy.

**Decisions**

- Deny by default on reads and writes alike; never trust an id from the URL.
- Search state lives in the URL so results are shareable and survive reloads.

**Learned**

- Ownership checks belong in the data layer, not in each page — one place to audit.

### 2026-09-21 — Registration, login, protection, logout

**What was worked on**

- **AUTH-003..006** — registration, login, route protection, logout.

**What changed**

- Sign-up and login forms wired to server actions; middleware redirects unauthenticated
  visitors; logout clears the session.

**Decisions**

- Server actions own authentication, so no credentials ever reach client state.

**Learned**

- Acceptance criteria were ticked only after live verification (2026-09-23).

### 2026-09-20 — Data model

**What was worked on**

- **DB-002** — User and Note schema migration.

**What changed**

- Initial Prisma schema and migration for users and notes (since replaced by
  Firestore; see 2026-09-30).

### 2026-09-19 — Project start

**What was worked on**

- **FND-001** — initialise the Next.js 15 project.

**What changed**

- App Router scaffold, Tailwind, TypeScript, first tickets in `tickets/`.

**Decisions**

- Work is tracked as tickets grouped by epic, each with dependencies, execution steps
  and acceptance criteria; commits reference the ticket id.

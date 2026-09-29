# NoteFlow

A private note-taking app: capture it, find it, manage it.

Next.js (App Router) · React · TypeScript · Tailwind CSS · Firebase Auth · Firestore

## Getting started

### 1. Create the Firebase project

1. [console.firebase.google.com](https://console.firebase.google.com) → create a
   project (e.g. "noteflow").
2. **Build → Authentication → Get started → Sign-in method** → enable
   "Email/Password".
3. **Project settings → Your apps → Add web app** → copy the `apiKey`.
4. **Project settings → Service accounts → Generate new private key** → download
   the JSON.
5. **Firestore Database → Create database** → production mode → a region close to
   you. Publish `firebase/firestore.rules` (denies all direct client access; the
   app writes through the Admin SDK).

### 2. Install, configure and run

```bash
npm install
cp .env.example .env     # fill the FIREBASE_* vars (see above / .env.example)
npm run dev
```

Optional demo account (2 notes):

```bash
npm run seed
```

Demo account after seeding: `demo@noteflow.app` / `Password123!`

## How sessions work

Sign-in uses the Firebase Identity Toolkit REST endpoint on the server; the
returned ID token is exchanged for a **Firebase session cookie**
(`__session`, httpOnly, Secure in production, 14-day max) via
`admin.auth().createSessionCookie`. Every protected page and server action calls
`requireUser()` which verifies that cookie. Signing out just clears the cookie —
the underlying user record stays valid until the cookie expires.

## Deploying to production

Firebase is the production backend, so there is **no separate database to
provision** — the Firestore database and Authentication provider you created for
development are the production ones.

1. Set these environment variables in the Vercel project for **Production** and
   **Preview** (paste `FIREBASE_PRIVATE_KEY` with literal `\n`, not real
   newlines):
   `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`,
   `FIREBASE_API_KEY`.
2. Apply the Firestore rules from `firebase/firestore.rules` to the production
   project.
3. Push to the production branch; `npm run build` is the build command and runs
   `next build`. Read the build log for warnings, not just the success line.
4. Open a pull request to confirm preview deployments build with their own
   environment, then verify the live URL serves the landing page over HTTPS.

## How the code is laid out

| Path | What lives there |
|---|---|
| `app/(auth)` | Login and sign-up pages (public) |
| `app/(dashboard)` | Every authenticated screen; the layout calls `requireUser()` |
| `components/` | Presentational and form components |
| `lib/firebase.ts` | Admin SDK init, REST sign-in, session-cookie helpers |
| `lib/session.ts` | `requireUser()` / `getSession()` — the one place a page asks "who is this?" |
| `lib/notes.ts` | Data access. Every function takes `userId` first |
| `lib/actions/` | Server Actions called by forms |
| `lib/validations.ts` | Zod schemas shared by client and server |
| `scripts/seed.ts` | Seeds the demo user and notes into Firestore |
| `firebase/firestore.rules` | Firestore security rules (deny direct client access) |
| `tickets/` | The build plan, split into epics and tickets |

## Security model in one paragraph

Middleware redirects visitors without a session cookie, but it is only a convenience.
The real checks are server-side: every page and action calls `requireUser()`, and every
query in `lib/notes.ts` is scoped by `userId`. Writes read the target document first and
throw `NotAuthorizedError` when the owner id differs, so a note id belonging to someone
else never changes. Reads on another user's note return the 404 screen, so ids cannot be
probed. Firestore rules deny all direct client access, so the only write path is the
Admin SDK behind the ownership checks.

## Working the tickets

Start at `tickets/README.md`. Tickets are grouped by area (foundation, database,
authentication, authorization, notes, search, pinning, UX, deployment) and carry
dependencies, execution steps and acceptance criteria. Files in this repo already
reference their ticket id in a comment where work is expected.
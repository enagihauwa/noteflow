# DEP-005 — Provision Firebase with the Firebase CLI

**Area:** Deployment
**Depends on:** DEP-001
**Blocks:** DEP-002
**Size:** M
**Spec reference:** §18 Phase 6

## Goal

The Firebase project behind the migrated stack exists and is reachable from this
machine through the Firebase CLI: Firestore with the deny-all rules published,
Email/Password enabled, local `.env` filled from the service account JSON, and
the demo account seeded — so the app boots against real credentials.

## Context

The code migration (Firestore data access, Firebase Auth, session cookies) is
written; what remains is project-side provisioning, done with
[firebase-tools](https://firebase.google.com/docs/cli) instead of clicking
through the console. `firebase login` opens a browser, so the Google sign-in
step is interactive and owned by the project owner. The CLI is not installed on
this machine yet. DEP-001 owns the Vercel environment variables; this ticket
owns creating and wiring the Firebase project itself.

## Execution steps

1. **Install the CLI** — `npm i -g firebase-tools`, verify with `firebase --version`.
2. **Sign in** — `firebase login` (opens the browser); confirm with
   `firebase login:list`.
3. **Pick a project** — `firebase projects:list`, then
   `firebase use --add <project-id>` to link one (writes `.firebaserc`). To create
   a brand-new project first: `firebase projects:create <project-id> --name "NoteFlow"`.
4. **Create Firestore in native (production) mode** — first pick a region with
   `firebase firestore:locations`, then:
   `firebase firestore:databases:create <database-id> --location=<region>`.
   (The CLI defaults to the standard edition — production mode, not test mode.)
5. **Enable Email/Password** — the CLI cannot toggle sign-in providers; do it in
   the console: Build → Authentication → Sign-in method → Email/Password.
6. **Fill `.env` from the project** (see `.env.example`): download the service
   account JSON (Project settings → Service accounts → Generate new private key)
   for `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
   (keep literal `\n`), and copy the web-app `apiKey` from Project settings →
   Your apps for `FIREBASE_API_KEY`.
7. **Publish the rules** — `firebase deploy --only firestore:rules`.
   `firebase.json` already points at `firebase/firestore.rules`, which denies all
   direct client access. Confirm the deployment succeeds before moving on.
8. **Seed and boot** — `npm run seed` then `npm run dev`; log in as
   `demo@noteflow.app` / `Password123!`.
9. **Optional local isolation** — run the emulators instead of the cloud project:
   `firebase emulators:start --only auth,firestore` (ports are configured in
   `firebase.json`).

## Firebase CLI reference

| Task | Command |
|---|---|
| Install | `npm i -g firebase-tools` |
| Check install | `firebase --version` |
| Sign in (browser) | `firebase login` |
| Verify session | `firebase login:list` |
| List projects | `firebase projects:list` |
| Create a project | `firebase projects:create <project-id> --name "NoteFlow"` |
| Link a project to the repo | `firebase use --add <project-id>` |
| List Firestore regions | `firebase firestore:locations` |
| Create Firestore (native) | `firebase firestore:databases:create <database-id> --location=<region>` |
| Publish rules | `firebase deploy --only firestore:rules` |
| Run emulators (auth + firestore) | `firebase emulators:start --only auth,firestore` |

Sign-in providers (Email/Password) are only configurable in the console — the
CLI has no command for them. The default database ID for the app's Admin SDK is
`(default)`; use `DATABASE_ID=noteflow` above only if you pass an explicit
`databaseId` to `getFirestore()`, which the app currently does not.

## Files touched

- `firebase.json` (rules path, emulator ports), `.firebaserc` (from
  `firebase use --add`), `.env`, Firestore rules deployed server-side

## Acceptance criteria

- [ ] `firebase projects:list` succeeds (CLI installed and authenticated).
- [ ] Firestore exists in native production mode and the deny-all rules from
      `firebase/firestore.rules` are deployed via `firebase deploy --only firestore:rules`.
- [ ] The Email/Password provider is enabled in the Firebase console.
- [ ] The app boots with real credentials (`npm run dev`) and the seeded demo
      account can sign up, log in and create a note.
- [ ] No production credential is committed (`.env` stays gitignored).

## Out of scope

- Vercel environment variables (DEP-002).
- Cloud Functions, Storage and any client-side Firebase SDK usage.
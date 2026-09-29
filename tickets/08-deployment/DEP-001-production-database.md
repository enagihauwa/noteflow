# DEP-001 — Production backend (Firebase) and environment

**Area:** Deployment
**Depends on:** DB-002, FND-005
**Blocks:** DEP-002
**Size:** S
**Spec reference:** §18 Phase 6

## Goal

A production Firebase project exists — Firestore in production mode and the
Email/Password auth provider enabled — and the service-account environment
variables are set where the app can read them.

## Context

Firebase replaced the original PostgreSQL/Prisma stack: Firestore is the
database and Firebase Auth the identity provider. There is no migration step
because there is no schema to migrate — but the Firestore security rules must
deny direct client access (all reads/writes go through the Admin SDK). Production
uses the same Firebase project as development; only the environment variables
differ per Vercel environment (Production vs Preview).

## Execution steps

1. Create the Firebase project, enable the Email/Password sign-in provider, and
   create the Firestore database in production mode (region closest to your users).
2. Download the service account JSON and copy `project_id`, `client_email` and
   `private_key` (literal `\n` escapes) plus the web-app `apiKey` into `.env`.
3. Publish `firebase/firestore.rules` (deny direct client access).
4. Set `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` and
   `FIREBASE_API_KEY` in the Vercel project's Production and Preview environments.
5. Confirm the Firestore rules are deployed and no environment variable contains a
   real secret in the repository.

## Files touched

- `.env.example`, `README.md`, `lib/env.ts`, `lib/firebase.ts`, Vercel project settings

## Acceptance criteria

- [ ] The Firebase project has Firestore in production mode and Email/Password enabled.
- [ ] `FIREBASE_PRIVATE_KEY` in production differs from any value used in development.
- [ ] Firestore rules deny all direct client access.
- [x] No production credential is committed.

## Out of scope

- Backups and point-in-time recovery; note the project's default retention.
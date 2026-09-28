# AUTH-001 — Configure Auth.js

**Area:** Authentication
**Depends on:** DB-002, FND-005
**Blocks:** AUTH-002 … AUTH-006, AUTHZ-001
**Size:** M
**Spec reference:** §6.1, §15

## Goal

Auth.js is wired to the database with a credentials provider, and the session carries
the user id that every later query depends on.

## Context

The session id is load-bearing. Every note query is scoped by `session.user.id`, so
if the id is missing from the token the whole authorization model silently collapses
into "no results". Add the id in both the `jwt` and `session` callbacks and extend
the `Session` type so TypeScript enforces it.

JWT strategy is chosen over database sessions to keep the MVP simple; that trade-off
is revisited by AUTH-006, since a JWT cannot be revoked server-side before it expires.

## Execution steps

1. Install `next-auth@beta` and generate `AUTH_SECRET` with `npx auth secret`.
2. Create `lib/auth.ts` exporting `handlers`, `auth`, `signIn`, `signOut` from `NextAuth({...})`.
3. Add the Credentials provider with an `authorize` function that looks the user up by email and compares the hash.
4. Set `session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }` and `pages: { signIn: "/login" }`.
5. Add the `jwt` and `session` callbacks that copy `user.id` onto the token and the session.
6. Create `app/api/auth/[...nextauth]/route.ts` re-exporting `handlers`.
7. Declare the `Session` augmentation in `types/next-auth.d.ts` so `session.user.id` is typed.
8. Add `lib/session.ts` exporting `requireUser()`, which returns the user or redirects to `/login`.

## Files touched

- `lib/auth.ts`, `lib/session.ts`, `app/api/auth/[...nextauth]/route.ts`, `types/next-auth.d.ts`, `.env`

## Acceptance criteria

- [x] `auth()` in a Server Component returns a session with `user.id` after login.
- [x] `authorize` returns `null` for a wrong password rather than throwing.
- [x] `session.user.id` type-checks without a cast.
- [x] The app refuses to boot without `AUTH_SECRET`.

## Out of scope

- OAuth providers, password reset, email verification.

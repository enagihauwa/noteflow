# AUTH-005 — Route protection and redirects

**Area:** Authentication
**Depends on:** AUTH-001, FND-004
**Blocks:** NOTE-002
**Size:** M
**Spec reference:** §5, §6.1, §20

## Goal

An unauthenticated visitor cannot see a private page, and an authenticated one is
not shown the login page again.

## Context

Two layers, and their roles are different. Middleware checks for a session cookie and
redirects early — fast, but it only sees a cookie, not a valid session, so it is a
convenience, not a guarantee. The real guard is `requireUser()` running on the server
in the `(dashboard)` layout and in every Server Action. Never rely on the middleware
alone, and never add a private page outside the `(dashboard)` group.

## Execution steps

1. Write `middleware.ts` matching `/dashboard/:path*`, `/notes/:path*`, `/login`, `/signup`.
2. Redirect cookieless visitors on protected paths to `/login?from=<pathname>`.
3. Redirect visitors who already have a session away from `/login` and `/signup` to `/dashboard`.
4. Call `requireUser()` in `app/(dashboard)/layout.tsx` so every private page is covered by one check.
5. Call `requireUser()` at the top of every Server Action too; actions are HTTP endpoints and are not covered by page guards.
6. Test with the cookie deleted in devtools: `/dashboard`, `/notes/new`, `/notes/<id>`, and a direct Server Action invocation.

## Files touched

- `middleware.ts`, `app/(dashboard)/layout.tsx`, `lib/session.ts`, `lib/actions/*.ts`

## Acceptance criteria

- [x] Every private URL redirects to `/login` when signed out.
- [x] After logging in, the user lands on the page they originally asked for.
- [x] A signed-in user visiting `/login` is sent to `/dashboard`.
- [x] A Server Action invoked without a session fails instead of running.
- [x] Deleting the session cookie mid-session locks the user out on next navigation.

## Out of scope

- Roles and admin routes; every user is an equal owner of their own notes.

# AUTH-006 — Logout and session invalidation

**Area:** Authentication
**Depends on:** AUTH-001
**Blocks:** —
**Size:** S
**Spec reference:** §6.1, §19

## Goal

Logging out ends the session and leaves nothing behind on a shared machine.

## Context

With the JWT strategy, logging out clears the cookie; the token itself stays valid
until it expires. That is acceptable for the MVP but should be written down, because
it is the reason `maxAge` is a week rather than a month. Moving to database sessions
later would make logout genuinely revoking.

## Execution steps

1. Add `logoutAction` calling `signOut({ redirectTo: "/login" })`.
2. Render it as a real `<form action={logoutAction}>` in the navbar, so it works without JavaScript and cannot be triggered by a stray GET.
3. Confirm the session cookie is cleared after logout.
4. Press the browser Back button after logging out and confirm the dashboard does not render from cache.
5. Record the JWT revocation caveat in the README security section.

## Files touched

- `lib/actions/auth-actions.ts`, `components/Navbar.tsx`, `README.md`

## Acceptance criteria

- [x] Logout redirects to `/login`.
- [x] The session cookie is gone afterwards.
- [x] Back-navigation after logout does not show note content.
- [x] Logout is a POST, not a link.

## Out of scope

- "Log out of all devices"; needs database sessions.

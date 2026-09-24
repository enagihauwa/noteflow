# UX-004 — Error handling and boundaries

**Area:** UX and quality
**Depends on:** UX-003
**Blocks:** —
**Size:** M
**Spec reference:** §12, §20

## Goal

An unexpected failure produces a page the user can act on, and a log the developer
can read.

## Context

Two audiences, two messages. The user gets "Something went wrong. Please try again."
and a retry. The server log gets the stack. Never swap them: a database error string
in the browser is both confusing and an information leak.

## Execution steps

1. Add `app/error.tsx` as the global boundary, with a reset button.
2. Add a boundary inside `(dashboard)` so a failure in the notes area keeps the navbar.
3. Add `app/not-found.tsx` for unknown routes and unauthorised or missing notes.
4. Centralise the user-facing strings in `lib/errors.ts`.
5. Map known errors (`NotAuthorizedError`, `NotFoundError`) to their specific messages; everything else to the generic one.
6. Log the real error server-side with enough context to find it.
7. Test by forcing a failure: stop Postgres and load the dashboard.

## Files touched

- `app/error.tsx`, `app/(dashboard)/error.tsx`, `app/not-found.tsx`, `lib/errors.ts`, `lib/actions/*.ts`

## Acceptance criteria

- [x] A thrown error renders the boundary, not a white screen.
- [x] Reset recovers without a full page reload.
- [x] No stack trace, SQL or internal id reaches the browser.
- [x] Known errors keep their specific message.
- [x] A database outage produces a readable page.

## Out of scope

- External error monitoring; add Sentry after launch.

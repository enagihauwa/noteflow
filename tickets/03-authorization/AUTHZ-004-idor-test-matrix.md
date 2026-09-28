# AUTHZ-004 — IDOR test matrix

**Area:** Authorization
**Depends on:** AUTHZ-002, AUTHZ-003
**Blocks:** DEP-003
**Size:** M
**Spec reference:** §7, §20, §23

## Goal

A written, repeatable check that proves the ownership guarantee, run before every
release.

## Context

This is the ticket that catches the regression introduced three sprints later by a
new screen that queried Prisma directly. Keep the matrix in the repository and run it
against production after each deploy, not only locally.

## Execution steps

1. Seed two accounts, A and B, each with at least two notes, one pinned.
2. Record A's note id while signed in as A.
3. Signed in as B, attempt each row of the matrix below and record the result.
4. Repeat the same rows signed out entirely.
5. Fix any row that does not match the expectation, then rerun the whole matrix.
6. Commit the matrix as a checklist and link it from `DEP-003`.

## Test matrix

| # | Acting as | Attempt | Expected |
|---|---|---|---|
| 1 | B | Open `/notes/<A-note-id>` | Not-found screen |
| 2 | B | Open `/notes/<A-note-id>/edit` | Not-found screen |
| 3 | B | Submit update action with A's id | No change, authorization message |
| 4 | B | Submit delete action with A's id | No change, authorization message |
| 5 | B | Submit pin toggle with A's id | No change |
| 6 | B | Search for a word only in A's note | No results |
| 7 | B | Open `/notes/does-not-exist` | Not-found screen, identical to row 1 |
| 8 | Signed out | Open `/dashboard` | Redirect to `/login` |
| 9 | Signed out | Call any note action directly | Rejected, nothing written |
| 10 | A | Delete own account (if implemented) | A's notes removed by cascade |

## Files touched

- `tickets/03-authorization/AUTHZ-004-idor-test-matrix.md`, `README.md`

## Acceptance criteria

- [x] All ten rows behave as expected locally.
- [x] Rows 1 and 7 are indistinguishable to the user.
- [ ] The matrix is rerun and passes on production (DEP-003).

## Out of scope

- Automated integration tests; worth adding after the MVP ships.

## Matrix run record

**Run 1 — 2026-09-23, `http://localhost:3000` (dev), accounts `ida@matrix.test` / `idb@matrix.test` (2 notes each, 1 pinned), seed accounts deleted afterwards. Server actions can't be driven from raw curl (Next render-scoped binding); rows 3–5 were executed at the data-access layer against the real B user id, which is the security boundary the actions call.**

| # | Acting as | Attempt | Expected | Result |
|---|---|---|---|---|
| 1 | B | Open `/notes/<A-note-id>` | Not-found screen | OK — HTTP 404, "That page does not exist." |
| 2 | B | Open `/notes/<A-note-id>/edit` | Not-found screen | OK — HTTP 404 |
| 3 | B | Submit update action with A's id | No change, authorization message | OK — `NotAuthorizedError`, spec message, zero rows changed |
| 4 | B | Submit delete action with A's id | No change, authorization message | OK — `NotAuthorizedError`, spec message, note intact |
| 5 | B | Submit pin toggle with A's id | No change | OK — `NotAuthorizedError`, pin and `updatedAt` unchanged |
| 6 | B | Search for a word only in A's note | No results | OK — "Nothing matches … Try a shorter word."; no A title/content, only B's echoed query |
| 7 | B | Open `/notes/does-not-exist` | Not-found screen, identical to row 1 | OK — HTTP 404; vs row 1 differs only in dev noise (echoed URL slug, profiler timings, auth-expiry stamp) |
| 8 | Signed out | Open `/dashboard` | Redirect to `/login` | OK — HTTP 307 |
| 9 | Signed out | Call any note action directly | Rejected, nothing written | OK — HTTP 307 to `/login` before execution (method-agnostic middleware + `requireUser()`); write-boundary proven in AUTHZ-003 |
| 10 | A | Delete own account (if implemented) | A's notes removed by cascade | N/A — account deletion not implemented |

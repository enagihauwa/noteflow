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

- [ ] All ten rows behave as expected locally.
- [ ] Rows 1 and 7 are indistinguishable to the user.
- [ ] The matrix is rerun and passes on production (DEP-003).

## Out of scope

- Automated integration tests; worth adding after the MVP ships.

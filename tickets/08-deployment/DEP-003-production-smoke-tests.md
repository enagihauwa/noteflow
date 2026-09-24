# DEP-003 — Production smoke tests

**Area:** Deployment
**Depends on:** DEP-002, AUTHZ-004, UX-006
**Blocks:** DEP-004
**Size:** M
**Spec reference:** §20, §23

## Goal

Every promise in the Definition of Done is verified against the live deployment.

## Context

Authentication behaves differently in production: secure cookies, a real domain,
cold starts. Locally-passing auth tests prove nothing about the deployed app, which
is why the IDOR matrix is rerun here rather than only on localhost.

## Execution steps

1. Register two fresh accounts on the live URL.
2. Walk the full journey from §5: sign up, create, view, search, edit, pin, unpin, delete, log out, log back in.
3. Rerun the AUTHZ-004 matrix in full against production. The matrix and its latest recorded results (Test matrix + `## Matrix run record`, including the seed accounts to create) live in `tickets/03-authorization/AUTHZ-004-idor-test-matrix.md`; record each production run back into that section.
4. Repeat the journey on a real phone over mobile data, not a desktop emulator.
5. Confirm the session survives a cold start and a page refresh.
6. Record results in a short checklist on the release pull request; file a ticket for anything that fails.

## Files touched

- `tickets/08-deployment/DEP-003-production-smoke-tests.md`

## Acceptance criteria

- [ ] All twelve items of §23 pass on the live URL.
- [ ] The full IDOR matrix passes in production.
- [ ] The app works on a real phone over mobile data.
- [ ] Sessions persist across refreshes and cold starts.
- [ ] Results are recorded, not just observed.

## Out of scope

- Load testing.

## Smoke test record

**Status:** blocked — requires DEP-002 (a live deployment), which is blocked on DEP-001 (production database). No production URL exists yet; nothing below is verified.

**Environment:** `_TBD_` (URL, date, browser/OS, provider DB region)

**Full journey (§5 / §23 items, step 2):**

- [ ] Register account 1 on the live URL
- [ ] Register account 2 on the live URL
- [ ] Sign up → lands on dashboard
- [ ] Create a note
- [ ] View the note
- [ ] Search for it and find it
- [ ] Edit the note and see the change
- [ ] Pin the note
- [ ] Unpin the note
- [ ] Delete the note
- [ ] Log out
- [ ] Log back in
- [ ] Full journey repeated on a real phone over mobile data
- [ ] Session survives a page refresh
- [ ] Session survives a cold start

**AUTHZ-004 production rerun (step 3):** run the 10-row matrix against the live URL as accounts `ida@matrix.test` / `idb@matrix.test` (2 notes each, 1 pinned); record the results in `tickets/03-authorization/AUTHZ-004-idor-test-matrix.md` under a new "Production" run block and tick its criterion.

**Result:** record outcomes back here and on the release PR; file a ticket for anything that fails.

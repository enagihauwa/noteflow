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
3. Rerun the AUTHZ-004 matrix in full against production.
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

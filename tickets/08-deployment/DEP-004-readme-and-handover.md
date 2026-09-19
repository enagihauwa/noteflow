# DEP-004 — README and handover docs

**Area:** Deployment
**Depends on:** DEP-003
**Blocks:** —
**Size:** S
**Spec reference:** §23 items 11–12

## Goal

Someone who has never seen the repository can run it locally in ten minutes and
understand how it is protected.

## Execution steps

1. Write the README: what the product is, the stack, a screenshot, the live URL.
2. Write the setup steps end to end, including `npx auth secret` and the seed command.
3. Add the folder map explaining what lives where.
4. Write the security model in a paragraph: session guard, ownership-scoped queries, why reads 404 rather than 403.
5. Link `tickets/README.md` as the build plan and explain the ticket workflow.
6. Note the known limits and the Version 2 candidates from §22.
7. Have someone else follow the README on a clean machine and fix whatever they trip on.

## Files touched

- `README.md`, `tickets/README.md`

## Acceptance criteria

- [ ] A clean clone runs locally by following the README alone.
- [ ] The security model is written down, not implied.
- [ ] The live URL is in the README.
- [ ] Known limitations are stated honestly.

## Out of scope

- API reference docs; there is no public API.

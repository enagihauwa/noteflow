# FND-003 — Linting, formatting, Git conventions

**Area:** Foundation
**Depends on:** FND-001
**Blocks:** —
**Size:** S
**Spec reference:** §15, §18 Phase 1

## Goal

Style arguments are settled by tooling, and every commit traces back to a ticket.

## Execution steps

1. Keep `eslint-config-next` with the TypeScript rules enabled.
2. Add Prettier with the Tailwind class-sorting plugin; commit an `.editorconfig`.
3. Write the branch convention into the README: `<TICKET-ID>-<slug>`.
4. Write the commit convention: `AUTH-003: add registration flow`.
5. Add a pull-request template that asks for the ticket id and a checked acceptance list.
6. Optional: a GitHub Action running `lint`, `typecheck` and `build` on every pull request.

## Files touched

- `.eslintrc.json`, `.prettierrc`, `.editorconfig`, `.github/pull_request_template.md`, `.github/workflows/ci.yml`

## Acceptance criteria

- [ ] `npm run lint` passes on a clean checkout.
- [ ] Prettier and ESLint do not fight over the same rules.
- [ ] The pull-request template asks for a ticket id.

## Out of scope

- Unit test infrastructure; the MVP verifies by manual test matrix (AUTHZ-004, DEP-003).

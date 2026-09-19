# FND-005 — Environment configuration

**Area:** Foundation
**Depends on:** FND-001
**Blocks:** AUTH-001, DB-001, DEP-001
**Size:** S
**Spec reference:** §18 Phase 6

## Goal

A new developer knows exactly which variables to set, and the app fails loudly at
start-up if one is missing rather than at 2am in production.

## Execution steps

1. Commit `.env.example` with `DATABASE_URL`, `AUTH_SECRET` and `AUTH_URL`, each with a comment.
2. Confirm `.env` and `.env*.local` are git-ignored.
3. Add `lib/env.ts` that parses `process.env` with a Zod schema and exports typed values.
4. Import it once from `lib/prisma.ts` so a missing variable fails at boot with a readable message.
5. Document the `npx auth secret` step in the README.
6. Confirm no secret is ever read in a Client Component or prefixed `NEXT_PUBLIC_`.

## Files touched

- `.env.example`, `lib/env.ts`, `README.md`, `.gitignore`

## Acceptance criteria

- [ ] Starting the app without `DATABASE_URL` prints a clear error naming the variable.
- [ ] No secret appears in the client bundle (check with `grep` on `.next/static`).
- [ ] `.env.example` matches the variables the code actually reads.

## Out of scope

- Production values themselves (DEP-001).

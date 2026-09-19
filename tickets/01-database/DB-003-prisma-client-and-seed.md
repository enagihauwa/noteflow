# DB-003 — Prisma client singleton and seed

**Area:** Database
**Depends on:** DB-002
**Blocks:** AUTHZ-001
**Size:** S
**Spec reference:** §15, §18 Phase 3

## Goal

One Prisma client for the whole app, and a seed script that produces test data in
one command.

## Context

Next.js hot reload re-evaluates modules, so a naive `new PrismaClient()` opens a new
connection pool on every save until Postgres refuses connections. The singleton on
`globalThis` is the standard fix.

## Execution steps

1. Write `lib/prisma.ts` exporting a client cached on `globalThis` outside production.
2. Enable query logging in development only.
3. Write `prisma/seed.ts` creating one demo user with a hashed password and two notes, one pinned.
4. Register the seed under the `prisma.seed` key in `package.json` and add `npm run db:seed`.
5. Run the seed twice to confirm it is idempotent (use `upsert` on the user).
6. Add `prisma generate` to the `build` script so deployments generate the client.

## Files touched

- `lib/prisma.ts`, `prisma/seed.ts`, `package.json`

## Acceptance criteria

- [ ] Editing a file in development does not open new database connections.
- [ ] `npm run db:seed` runs twice without a unique-constraint error.
- [ ] The seeded password is a hash, not plain text.

## Out of scope

- Production seeding; the production database starts empty.

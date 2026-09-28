# DEP-001 — Production database and environment

**Area:** Deployment
**Depends on:** DB-002, FND-005
**Blocks:** DEP-002
**Size:** S
**Spec reference:** §18 Phase 6

## Goal

A production PostgreSQL database exists with the schema applied, and the production
secrets are set where the app can read them.

## Context

Production gets its own `AUTH_SECRET`, never the development one. Serverless
functions open many short-lived connections, so use the pooled connection string the
provider offers, and keep the direct string for migrations.

## Execution steps

1. Create the production database (Neon, Supabase or Railway) in the region closest to your users.
2. Copy the pooled `DATABASE_URL` and, if the provider has one, the direct URL for migrations.
3. Generate a fresh `AUTH_SECRET` with `npx auth secret`.
4. Set `DATABASE_URL`, `AUTH_SECRET` and `AUTH_URL` in the Vercel project's production environment.
5. Apply the schema with `prisma migrate deploy` — never `migrate dev` against production.
6. Confirm the tables exist and the database is not publicly writable.

## Files touched

- `.env.example`, `README.md`, Vercel project settings

## Acceptance criteria

- [ ] The production database has both tables and the unique email constraint.
- [ ] Production secrets differ from development ones.
- [ ] Migrations are applied with `migrate deploy`.
- [x] No production credential is committed.

## Out of scope

- Backups and point-in-time recovery; note the provider's default retention.

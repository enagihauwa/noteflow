# DB-001 — Provision PostgreSQL and wire Prisma

**Area:** Database
**Depends on:** FND-001, FND-005
**Blocks:** DB-002
**Size:** S
**Spec reference:** §15, §18 Phase 3

## Goal

The app talks to a real PostgreSQL database in development.

## Context

Local Postgres in Docker keeps development offline-friendly, which matters on an
unreliable connection. A hosted database (Neon, Supabase, Railway) is fine too, but
pick one and document it so everyone runs the same thing.

## Execution steps

1. Install `prisma` as a dev dependency and `@prisma/client` as a dependency.
2. Run `npx prisma init --datasource-provider postgresql`.
3. Start Postgres locally: `docker run --name noteflow-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16`.
4. Put the connection string in `.env` as `DATABASE_URL`.
5. Verify the connection with `npx prisma db pull` or `npx prisma studio`.
6. Note the chosen setup and the Docker command in the README.

## Files touched

- `prisma/schema.prisma`, `.env`, `.env.example`, `README.md`, `package.json`

## Acceptance criteria

- [ ] Prisma connects to the local database without error.
- [ ] The connection string is only in `.env`, never committed.
- [ ] The README explains how to start the database from scratch.

## Out of scope

- The production database (DEP-001).

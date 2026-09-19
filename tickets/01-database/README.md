# Database

PostgreSQL, Prisma and the two tables the whole product rests on.

| Ticket | Title | Depends on |
|---|---|---|
| DB-001 | Provision PostgreSQL and wire Prisma | FND-001 |
| DB-002 | User and Note schema | DB-001 |
| DB-003 | Prisma client singleton and seed | DB-002 |

Exit condition: `npm run db:migrate` creates both tables locally, and
`npm run db:seed` produces a demo user with two notes.

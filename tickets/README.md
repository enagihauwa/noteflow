# NoteFlow — Build Tickets

Every requirement in the MVP spec is broken into a ticket. Tickets are grouped
into folders by area, numbered in the order they are normally built.

```
tickets/
├── 00-foundation/      project setup, tooling, app shell
├── 01-database/        PostgreSQL, Prisma, schema, seed
├── 02-authentication/  "who are you?" — Auth.js, signup, login, logout, sessions
├── 03-authorization/   "what may you touch?" — ownership on every note operation
├── 04-notes/           create, read, update, delete
├── 05-search/          searching title and content
├── 06-pinning/         pin, unpin, pinned grouping
├── 07-ux-quality/      validation, empty/loading states, responsiveness, a11y
└── 08-deployment/      production config, Vercel, smoke tests, docs
```

## Ticket ID prefixes

| Prefix | Area |
|---|---|
| `FND` | Foundation |
| `DB` | Database |
| `AUTH` | Authentication |
| `AUTHZ` | Authorization |
| `NOTE` | Notes |
| `SRCH` | Search |
| `PIN` | Pinning |
| `UX` | UX and quality |
| `DEP` | Deployment |

## Board

| # | Ticket | Depends on | Size |
|---|---|---|---|
| 1 | FND-001 Initialise the Next.js project | — | S |
| 2 | FND-002 Tailwind and design tokens | FND-001 | S |
| 3 | FND-003 Linting, formatting, Git conventions | FND-001 | S |
| 4 | FND-004 App shell and route groups | FND-002 | M |
| 5 | FND-005 Environment configuration | FND-001 | S |
| 6 | DB-001 Provision PostgreSQL and wire Prisma | FND-001 | S |
| 7 | DB-002 User and Note schema | DB-001 | M |
| 8 | DB-003 Prisma client singleton and seed | DB-002 | S |
| 9 | AUTH-001 Configure Auth.js | DB-002, FND-005 | M |
| 10 | AUTH-002 Password hashing | AUTH-001 | S |
| 11 | AUTH-003 Registration flow | AUTH-002 | M |
| 12 | AUTH-004 Login flow | AUTH-002 | M |
| 13 | AUTH-005 Route protection and redirects | AUTH-001 | M |
| 14 | AUTH-006 Logout and session invalidation | AUTH-001 | S |
| 15 | AUTH-007 Auth error messages | AUTH-003, AUTH-004 | S |
| 16 | AUTHZ-001 Ownership-scoped data access layer | DB-003, AUTH-001 | M |
| 17 | AUTHZ-002 Ownership on reads | AUTHZ-001 | S |
| 18 | AUTHZ-003 Ownership on writes and deletes | AUTHZ-001 | S |
| 19 | AUTHZ-004 IDOR test matrix | AUTHZ-002, AUTHZ-003 | M |
| 20 | NOTE-001 Create a note | AUTHZ-001 | M |
| 21 | NOTE-002 Notes list on the dashboard | AUTHZ-001 | M |
| 22 | NOTE-003 View a single note | AUTHZ-002 | S |
| 23 | NOTE-004 Edit a note | AUTHZ-003 | M |
| 24 | NOTE-005 Delete a note with confirmation | AUTHZ-003 | M |
| 25 | SRCH-001 Search bar with URL-backed query | NOTE-002 | M |
| 26 | SRCH-002 Search title and content | SRCH-001 | S |
| 27 | SRCH-003 No-results state | SRCH-002 | S |
| 28 | PIN-001 Pin and unpin a note | NOTE-003 | M |
| 29 | PIN-002 Pinned grouping and indicator | PIN-001, NOTE-002 | S |
| 30 | UX-001 Empty states | NOTE-002 | S |
| 31 | UX-002 Loading states | NOTE-002 | S |
| 32 | UX-003 Form validation with Zod | NOTE-001 | M |
| 33 | UX-004 Error handling and boundaries | UX-003 | M |
| 34 | UX-005 Responsive layout | FND-004 | M |
| 35 | UX-006 Accessibility pass | UX-005 | M |
| 36 | UX-007 Landing page | FND-004 | S |
| 37 | DEP-001 Production database and env | DB-002 | S |
| 38 | DEP-002 Deploy to Vercel | DEP-001 | M |
| 39 | DEP-003 Production smoke tests | DEP-002 | M |
| 40 | DEP-004 README and handover docs | DEP-003 | S |

Sizes: S ≈ under half a day, M ≈ half to one day, L ≈ more than a day.

## How to work a ticket

1. Read the ticket top to bottom before writing code, including its dependencies.
2. Branch as `<id>-<slug>`, e.g. `AUTH-003-registration-flow`.
3. Work the execution steps in order.
4. Tick every acceptance criterion yourself before opening the pull request.
5. Reference the id in the commit subject: `AUTH-003: add registration flow`.

## Spec traceability

| Spec section | Covered by |
|---|---|
| §6.1 Authentication | AUTH-001 … AUTH-007 |
| §7 Authorization | AUTHZ-001 … AUTHZ-004 |
| §8 Dashboard | NOTE-002, UX-001 |
| §9 Note management | NOTE-001 … NOTE-005 |
| §10 Search | SRCH-001 … SRCH-003 |
| §11 Pinning | PIN-001, PIN-002 |
| §12 Validation and errors | UX-003, UX-004, AUTH-007 |
| §13 Screens | UX-007, AUTH-003, AUTH-004, NOTE-001 … NOTE-004 |
| §14 Database structure | DB-002 |
| §15–17 Stack, architecture, structure | FND-001 … FND-005 |
| §18 Roadmap | Folder order 00 → 08 |
| §20 Acceptance criteria | Per-ticket criteria |
| §23 Definition of done | DEP-003, DEP-004 |

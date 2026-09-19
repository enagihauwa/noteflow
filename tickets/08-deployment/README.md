# Deployment

Getting NoteFlow onto the internet and proving it works there.

| Ticket | Title | Depends on |
|---|---|---|
| DEP-001 | Production database and environment | DB-002 |
| DEP-002 | Deploy to Vercel | DEP-001 |
| DEP-003 | Production smoke tests | DEP-002 |
| DEP-004 | README and handover docs | DEP-003 |

Exit condition: every item in §23 Definition of Done is verified on the live URL,
not on localhost.

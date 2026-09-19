# Authorization

"What are you allowed to touch?" — the guarantee that User B cannot read, edit or
delete User A's note by knowing its id.

| Ticket | Title | Depends on |
|---|---|---|
| AUTHZ-001 | Ownership-scoped data access layer | DB-003, AUTH-001 |
| AUTHZ-002 | Ownership on reads | AUTHZ-001 |
| AUTHZ-003 | Ownership on writes and deletes | AUTHZ-001 |
| AUTHZ-004 | IDOR test matrix | AUTHZ-002, AUTHZ-003 |

This area exists separately from `02-authentication` because the two answer different
questions and fail in different ways. Authentication failures are loud; authorization
failures are silent and only show up when someone goes looking.

Exit condition: the test matrix in AUTHZ-004 passes in full, with two real accounts.

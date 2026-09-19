# Authentication

"Who are you?" — accounts, sessions and the pages that create them. Authentication
is compulsory in this product: there is no anonymous mode and no demo dashboard.

| Ticket | Title | Depends on |
|---|---|---|
| AUTH-001 | Configure Auth.js | DB-002, FND-005 |
| AUTH-002 | Password hashing | AUTH-001 |
| AUTH-003 | Registration flow | AUTH-002 |
| AUTH-004 | Login flow | AUTH-002 |
| AUTH-005 | Route protection and redirects | AUTH-001 |
| AUTH-006 | Logout and session invalidation | AUTH-001 |
| AUTH-007 | Auth error messages | AUTH-003, AUTH-004 |

Exit condition: a visitor can register, land on the dashboard, log out, log back in,
and cannot reach `/dashboard` with the session cookie cleared.

Authorization — what a signed-in user may touch — is a separate area, `03-authorization`.

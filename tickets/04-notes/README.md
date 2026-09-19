# Notes

The product itself: create, read, update, delete. Every ticket here assumes the
ownership layer from `03-authorization` already exists and calls through it.

| Ticket | Title | Depends on |
|---|---|---|
| NOTE-001 | Create a note | AUTHZ-001 |
| NOTE-002 | Notes list on the dashboard | AUTHZ-001 |
| NOTE-003 | View a single note | AUTHZ-002 |
| NOTE-004 | Edit a note | AUTHZ-003 |
| NOTE-005 | Delete a note with confirmation | AUTHZ-003 |

Exit condition: a user can write a note, find it on the dashboard, open it, change
it and delete it, without ever seeing a page that does not belong to them.

# Pinning

One bit per note, `isPinned`, that changes where the note sits and how it looks.

| Ticket | Title | Depends on |
|---|---|---|
| PIN-001 | Pin and unpin a note | NOTE-003, AUTHZ-003 |
| PIN-002 | Pinned grouping and indicator | PIN-001, NOTE-002 |

Exit condition: pinning a note moves it into a Pinned group at the top of the
dashboard, and unpinning returns it to the rest.

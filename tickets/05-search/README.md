# Search

Finding a note again is half the product. Search covers title and content, lives in
the URL, and has a designed empty result.

| Ticket | Title | Depends on |
|---|---|---|
| SRCH-001 | Search bar with URL-backed query | NOTE-002 |
| SRCH-002 | Search title and content | SRCH-001 |
| SRCH-003 | No-results state | SRCH-002 |

Exit condition: typing a word filters the list, the URL is shareable and
refreshable, and a miss says "No notes found."

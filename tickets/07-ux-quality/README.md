# UX and quality

The difference between a working CRUD app and one people keep using: states that are
handled, errors that explain themselves, and a layout that survives a phone.

| Ticket | Title | Depends on |
|---|---|---|
| UX-001 | Empty states | NOTE-002 |
| UX-002 | Loading states | NOTE-002 |
| UX-003 | Form validation with Zod | NOTE-001 |
| UX-004 | Error handling and boundaries | UX-003 |
| UX-005 | Responsive layout | FND-004 |
| UX-006 | Accessibility pass | UX-005 |
| UX-007 | Landing page | FND-004 |

Exit condition: every screen has a defined empty, loading and error state, and the
app is usable on a 360px phone with a keyboard and a screen reader.

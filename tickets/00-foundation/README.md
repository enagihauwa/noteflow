# Foundation

Everything that must exist before a feature can be written: the project itself,
the styling system, the lint rules, the app shell and the environment contract.

| Ticket | Title | Depends on |
|---|---|---|
| FND-001 | Initialise the Next.js project | — |
| FND-002 | Tailwind and design tokens | FND-001 |
| FND-003 | Linting, formatting, Git conventions | FND-001 |
| FND-004 | App shell and route groups | FND-002 |
| FND-005 | Environment configuration | FND-001 |

Exit condition: `npm run dev` serves a styled landing page, `npm run typecheck`
and `npm run lint` both pass, and the route groups are in place with placeholder pages.

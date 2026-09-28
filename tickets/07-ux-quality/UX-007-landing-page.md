# UX-007 — Landing page

**Area:** UX and quality
**Depends on:** FND-004
**Blocks:** —
**Size:** S
**Spec reference:** §13.1

## Goal

A visitor who lands on `/` understands what NoteFlow is in a few seconds and has one
obvious next step.

## Context

The page has one job: get the right person to sign up. It carries the product name,
the promise from §1, and two routes in. No feature grid, no testimonials, no pricing —
there is nothing to price.

## Execution steps

1. Build `app/page.tsx` with the product name, the headline and one supporting sentence.
2. Add the two actions: create an account (primary) and log in (secondary).
3. Set the document title and description in `app/layout.tsx` for sharing and search.
4. Redirect visitors who already have a session straight to `/dashboard`.
5. Keep the page fully static — no client JavaScript needed to render it.
6. Check it at 360px and with images disabled.

## Files touched

- `app/page.tsx`, `app/layout.tsx`, `middleware.ts`

## Acceptance criteria

- [x] The page states what the product does without scrolling.
- [x] Both actions lead to the right screens.
- [x] A signed-in visitor is redirected to the dashboard.
- [x] The page renders with no client-side JavaScript.

## Out of scope

- Marketing site, blog, analytics.

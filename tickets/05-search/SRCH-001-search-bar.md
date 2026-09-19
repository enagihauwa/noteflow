# SRCH-001 — Search bar with URL-backed query

**Area:** Search
**Depends on:** NOTE-002
**Blocks:** SRCH-002
**Size:** M
**Spec reference:** §8, §10

## Goal

A search field on the dashboard that narrows the list as the user types, with the
query held in the URL.

## Context

Keeping the query in `?q=` rather than component state means a refresh, a back
button and a shared link all keep working, and the server can do the filtering.
`router.replace` inside a transition avoids stacking one history entry per keystroke.

## Execution steps

1. Build `components/SearchBar.tsx` as a client component reading `useSearchParams`.
2. On change, write a trimmed `q` into the URL with `router.replace`, removing it when empty.
3. Wrap the update in `useTransition` and show a quiet pending hint while results load.
4. Debounce input by roughly 300ms so a fast typist does not fire a query per character.
5. Read `searchParams.q` in the dashboard Server Component and pass it to `listNotes`.
6. Give the input a visually hidden label and `type="search"`.
7. Test: typing, clearing, refreshing with a query present, and opening a shared URL with `?q=`.

## Files touched

- `components/SearchBar.tsx`, `app/(dashboard)/dashboard/page.tsx`

## Acceptance criteria

- [ ] Results narrow as the user types.
- [ ] The query survives a page refresh.
- [ ] Clearing the field restores the full list and removes `q` from the URL.
- [ ] Typing does not flood the history stack.
- [ ] The input is labelled for screen readers.

## Out of scope

- Search across other users, or a global command palette.

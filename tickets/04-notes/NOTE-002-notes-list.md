# NOTE-002 — Notes list on the dashboard

**Area:** Notes
**Depends on:** AUTHZ-001, AUTH-005
**Blocks:** SRCH-001, PIN-002, UX-001, UX-002
**Size:** M
**Spec reference:** §8, §9 Read, §19

## Goal

After login, the user sees their notes, most useful first, and can open any of them.

## Context

The dashboard is a Server Component that queries directly — no client fetch, no
loading spinner on first paint. Sort order is pinned first, then most recently
updated, which matches the composite index from DB-002.

## Execution steps

1. In `app/(dashboard)/dashboard/page.tsx`, call `requireUser()` then `listNotes(user.id)`.
2. Order by `[{ isPinned: "desc" }, { updatedAt: "desc" }]`.
3. Build `components/notes/NoteCard.tsx`: title, a three-line content preview, the updated date, and a pin marker slot.
4. Build `components/notes/NoteList.tsx` rendering a responsive grid with an optional section heading.
5. Assemble the dashboard header: greeting, note count, and the New note button from §8.
6. Make the whole card a link to `/notes/<id>` so the tap target is large on mobile.
7. Seed roughly 30 notes and check the page still renders quickly.

## Files touched

- `app/(dashboard)/dashboard/page.tsx`, `components/notes/NoteCard.tsx`, `components/notes/NoteList.tsx`

## Acceptance criteria

- [ ] Only the signed-in user's notes appear.
- [ ] Pinned notes sort above the rest; ties break by most recently updated.
- [ ] The preview truncates cleanly and never breaks the card layout.
- [ ] Clicking anywhere on a card opens that note.
- [ ] The dashboard renders without a client-side data fetch.

## Out of scope

- Pagination and infinite scroll; revisit past a few hundred notes.

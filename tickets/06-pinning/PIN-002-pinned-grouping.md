# PIN-002 — Pinned grouping and indicator

**Area:** Pinning
**Depends on:** PIN-001, NOTE-002
**Blocks:** —
**Size:** S
**Spec reference:** §11, §20

## Goal

Pinned notes read as a distinct group at the top of the dashboard, as sketched in §11.

## Context

The amber marker is the only place that colour is used in the whole interface, which
is what makes it legible at a glance. Because colour alone is not an accessible
signal, the grouping heading carries the same information for anyone who cannot see it.

## Execution steps

1. Split the dashboard results into pinned and unpinned after loading.
2. Render a "Pinned" section first, then the remainder under a second heading.
3. Hide both headings when nothing is pinned, so an all-unpinned dashboard looks unsegmented.
4. Add the amber dot to `NoteCard` with `aria-label="Pinned"`.
5. Keep the grouping applied to search results too.
6. Test with: nothing pinned, everything pinned, a mix, and a mix under an active search.

## Files touched

- `app/(dashboard)/dashboard/page.tsx`, `components/notes/NoteList.tsx`, `components/notes/NoteCard.tsx`

## Acceptance criteria

- [x] Pinned notes appear above the rest under a clear heading.
- [x] Pinned status is conveyed by more than colour.
- [x] Headings disappear when the split is meaningless.
- [x] Grouping still applies within search results.

## Out of scope

- Manual drag-to-reorder within the pinned group.

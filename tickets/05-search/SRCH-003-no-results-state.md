# SRCH-003 — No-results state

**Area:** Search
**Depends on:** SRCH-002
**Blocks:** —
**Size:** S
**Spec reference:** §10, §12, §20

## Goal

A search that matches nothing explains itself instead of showing a blank page.

## Context

Two different emptinesses must not share one message. "You have no notes yet" invites
a first note; "No notes found" means the query missed. Showing the first to someone
with forty notes reads like data loss.

## Execution steps

1. Extend `components/EmptyState.tsx` to take an optional `query`.
2. With a query present, show "No notes found." and echo the term the user typed.
3. Offer the way out: clearing the search, or creating a note with that title.
4. Keep the search field populated so the user can edit rather than retype.
5. Escape the echoed query so it renders as text.
6. Test: a nonsense query, a query matching only another user's note, and a query on an account with zero notes.

## Files touched

- `components/EmptyState.tsx`, `app/(dashboard)/dashboard/page.tsx`

## Acceptance criteria

- [x] A missed search shows "No notes found."
- [x] An account with no notes shows the first-note invitation instead.
- [x] The search field keeps the query after a miss.
- [x] The echoed query cannot inject markup.

## Out of scope

- "Did you mean" suggestions.

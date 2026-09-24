# UX-001 — Empty states

**Area:** UX and quality
**Depends on:** NOTE-002
**Blocks:** —
**Size:** S
**Spec reference:** §8, §20

## Goal

A new account sees an invitation to write, not an empty grid.

## Context

The first screen after signup is the only one every user is guaranteed to see. It
should say what to do next and offer the button to do it, in the interface's voice.

## Execution steps

1. Build `components/EmptyState.tsx` with a heading, one line of direction and a primary action.
2. Use the spec's wording as the base: you have no notes yet, create your first one.
3. Include the Create note button, styled the same as the dashboard's primary action.
4. Render it whenever the list is empty and no search is active.
5. Check the state again after deleting the last note.
6. Keep it visually quiet: a dashed boundary, no illustration.

## Files touched

- `components/EmptyState.tsx`, `app/(dashboard)/dashboard/page.tsx`

## Acceptance criteria

- [x] A new account sees the empty state, not a blank page.
- [x] Deleting the last note returns to it.
- [x] The action in it leads to the create form.
- [x] It never appears at the same time as a note card.

## Out of scope

- Onboarding tours and sample notes.

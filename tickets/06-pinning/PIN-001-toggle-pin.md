# PIN-001 — Pin and unpin a note

**Area:** Pinning
**Depends on:** NOTE-003, AUTHZ-003
**Blocks:** PIN-002
**Size:** M
**Spec reference:** §11, §19

## Goal

One control pins a note and unpins it again, from the note page and from the card.

## Context

Pin is a toggle, not two actions, and the button must say what will happen next:
"Pin" on an unpinned note, "Unpin" on a pinned one. Read the current state from the
database inside the action rather than trusting a value sent from the client, so a
stale page cannot flip the wrong way.

## Execution steps

1. Add `togglePin(userId, noteId)` to `lib/notes.ts`: read the note through `getNote`, then write the inverse.
2. Write `togglePinAction(noteId)` with `requireUser()` and the ownership check.
3. Add the toggle button to `NoteActions` with `aria-pressed` reflecting the state.
4. Revalidate `/dashboard` and the note page after the write.
5. Consider `useOptimistic` so the label flips immediately, reverting if the action fails.
6. Test: pin, unpin, pin from the dashboard card, toggle twice quickly, toggle another user's note id.

## Files touched

- `lib/notes.ts`, `lib/actions/note-actions.ts`, `components/notes/NoteActions.tsx`

## Acceptance criteria

- [x] The button label always describes the next action.
- [x] Pin state persists across a refresh.
- [x] `aria-pressed` reflects the current state.
- [x] Toggling another user's note id changes nothing.
- [x] Rapid double-toggling ends in a consistent state.

## Out of scope

- A limit on how many notes can be pinned.

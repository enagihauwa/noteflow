# NOTE-005 — Delete a note with confirmation

**Area:** Notes
**Depends on:** AUTHZ-003, NOTE-003
**Blocks:** —
**Size:** M
**Spec reference:** §9 Delete, §21 Should Have

## Goal

A user removes a note they no longer need, without losing one by accident.

## Context

Deletion is permanent — there is no trash in the MVP — so the confirmation step is
not optional politeness. Prefer an inline two-step confirm over `window.confirm`:
it is styleable, keyboard-accessible and testable. The confirming button says exactly
what it does.

## Execution steps

1. Add the two-step confirm to `NoteActions`: Delete reveals "Delete for good" and "Keep".
2. Write `deleteNoteAction(noteId)` with `requireUser()` and the ownership-scoped delete.
3. On success, revalidate `/dashboard` and redirect there.
4. Make Escape and clicking away cancel the confirmation.
5. Ensure the confirm control receives focus when revealed, and announce it to assistive tech.
6. Test: confirm, cancel, delete the last remaining note (empty state appears), delete a pinned note.

## Files touched

- `components/notes/NoteActions.tsx`, `lib/actions/note-actions.ts`

## Acceptance criteria

- [ ] Deleting requires two deliberate actions.
- [ ] Cancelling leaves the note untouched.
- [ ] After deletion the user lands on the dashboard and the note is gone.
- [ ] Deleting the last note shows the empty state.
- [ ] The flow is completable with the keyboard alone.

## Out of scope

- Soft delete, trash and restore.

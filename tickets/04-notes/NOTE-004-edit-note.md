# NOTE-004 — Edit a note

**Area:** Notes
**Depends on:** AUTHZ-003, NOTE-001
**Blocks:** —
**Size:** M
**Spec reference:** §9 Update, §19

## Goal

A user changes a note's title or content and the change is visible everywhere
immediately.

## Context

Reuse `NoteForm` in `edit` mode with the action bound to the note id, so create and
edit share their validation and layout. `updatedAt` moves the note to the top of the
list, which is intended: recently touched notes are the ones you want next.

## Execution steps

1. Build `app/(dashboard)/notes/[id]/edit/page.tsx`, loading the note through `getNote`.
2. Prefill the form with the current title and content.
3. Write `updateNoteAction(noteId, prevState, formData)` and bind the id with `.bind(null, id)`.
4. Validate with the same `noteSchema` as create.
5. Revalidate both `/dashboard` and `/notes/<id>` after a successful save, then redirect to the note.
6. Make Cancel return to the note, not the dashboard.
7. Test: edit title only, content only, both, clear the title, and edit someone else's note id.

## Files touched

- `app/(dashboard)/notes/[id]/edit/page.tsx`, `components/notes/NoteForm.tsx`, `lib/actions/note-actions.ts`

## Acceptance criteria

- [x] The form opens prefilled with the current values.
- [x] Saving updates the note and returns to the note page.
- [x] `updatedAt` changes and the dashboard order reflects it.
- [x] Validation matches the create form exactly.
- [x] Editing another user's note id is refused (AUTHZ-003).

## Out of scope

- Version history and undo.

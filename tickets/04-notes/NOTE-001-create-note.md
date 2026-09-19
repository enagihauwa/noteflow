# NOTE-001 — Create a note

**Area:** Notes
**Depends on:** AUTHZ-001
**Blocks:** NOTE-002
**Size:** M
**Spec reference:** §9 Create, §13.5, §19

## Goal

From the dashboard, a user reaches an empty form, types a title and content, saves,
and sees the saved note.

## Context

Speed is the product's whole promise, so the form is two fields and nothing else: no
folder picker, no tag input, no formatting toolbar. The same `NoteForm` component
serves create and edit (NOTE-004) with a `mode` prop, so the two screens cannot drift
apart.

## Execution steps

1. Add `noteSchema` to `lib/validations.ts`: title 1–120 characters, content required, both trimmed.
2. Build `components/notes/NoteForm.tsx` with a title input, a generously sized textarea, Save and Cancel.
3. Write `createNoteAction`: `requireUser()`, parse, call `createNote(user.id, data)`.
4. On success, `revalidatePath("/dashboard")` and redirect to the new note.
5. Wire the page at `app/(dashboard)/notes/new/page.tsx`.
6. Show a live title character count (§21 Should Have) and disable Save while submitting.
7. Test: valid note, empty title, empty content, whitespace-only title, very long content.

## Files touched

- `app/(dashboard)/notes/new/page.tsx`, `components/notes/NoteForm.tsx`, `lib/actions/note-actions.ts`, `lib/validations.ts`

## Acceptance criteria

- [ ] A saved note belongs to the signed-in user and appears on the dashboard.
- [ ] An empty title shows "Please enter a note title."
- [ ] An empty content shows "Please enter some content."
- [ ] A whitespace-only value counts as empty.
- [ ] Cancel returns to the dashboard without saving.
- [ ] Double-clicking Save does not create two notes.

## Out of scope

- Rich text, attachments, autosave drafts.

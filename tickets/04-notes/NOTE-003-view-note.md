# NOTE-003 — View a single note

**Area:** Notes
**Depends on:** AUTHZ-002
**Blocks:** NOTE-004, NOTE-005, PIN-001
**Size:** S
**Spec reference:** §9 Read, §13.6

## Goal

A readable note page carrying the actions that apply to it: edit, pin, delete.

## Context

Content is stored as plain text and must render as plain text. Use
`whitespace-pre-wrap` so line breaks survive, and never inject it as HTML — that is
a stored XSS hole for the price of one convenience.

## Execution steps

1. Build `app/(dashboard)/notes/[id]/page.tsx` with `requireUser()` and `getNote`.
2. Render the title as the page heading and the content with `whitespace-pre-wrap`.
3. Show the updated timestamp in the reader's locale.
4. Add `components/notes/NoteActions.tsx` with the pin, edit and delete controls.
5. Add a back link to the dashboard that preserves any active search query.
6. Constrain the reading column to under 80 characters per line.
7. Test with a note containing blank lines, long unbroken URLs and HTML-looking text.

## Files touched

- `app/(dashboard)/notes/[id]/page.tsx`, `components/notes/NoteActions.tsx`

## Acceptance criteria

- [ ] Line breaks in the content are preserved.
- [ ] Text that looks like HTML is displayed, not executed.
- [ ] A long URL wraps instead of widening the page.
- [ ] Edit, pin and delete are all reachable from this page.

## Out of scope

- Markdown rendering; §22 Version 2.

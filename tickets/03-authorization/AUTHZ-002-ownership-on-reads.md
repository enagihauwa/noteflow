# AUTHZ-002 — Ownership on reads

**Area:** Authorization
**Depends on:** AUTHZ-001
**Blocks:** AUTHZ-004, NOTE-003
**Size:** S
**Spec reference:** §7, §12, §20

## Goal

Requesting someone else's note id reveals nothing — not the content, and not that
the note exists.

## Context

There is a deliberate choice here. The spec offers "You are not authorized to access
this note." for the unauthorized case, but returning that on a read confirms the id
belongs to a real note, which lets an attacker enumerate. So: reads of another user's
note render the same not-found screen as a nonexistent id, and the explicit
authorization message is reserved for mutations, where the user is acting on
something they were shown.

## Execution steps

1. In `app/(dashboard)/notes/[id]/page.tsx`, call `requireUser()` then `getNote(user.id, id)`.
2. Catch `NotFoundError` and `NotAuthorizedError` and call `notFound()` for both.
3. Do the same in the edit page.
4. Confirm `listNotes` filters by `userId` so the dashboard can never include a foreign note.
5. Check that no server-rendered payload contains another user's data — inspect the streamed RSC response, not just the visible page.
6. Confirm timing is not obviously different between the two cases.

## Files touched

- `app/(dashboard)/notes/[id]/page.tsx`, `app/(dashboard)/notes/[id]/edit/page.tsx`, `app/(dashboard)/dashboard/page.tsx`

## Acceptance criteria

- [x] Opening another user's note id shows the not-found screen.
- [x] A nonexistent id shows the identical screen.
- [x] The dashboard never lists a note the signed-in user does not own.
- [x] No foreign note data appears anywhere in the response payload.

## Out of scope

- Audit logging of denied reads.

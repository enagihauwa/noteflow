# AUTHZ-003 — Ownership on writes and deletes

**Area:** Authorization
**Depends on:** AUTHZ-001
**Blocks:** AUTHZ-004, NOTE-004, NOTE-005, PIN-001
**Size:** S
**Spec reference:** §7, §9, §20

## Goal

Every mutation verifies ownership inside the query, so a forged note id changes
nothing.

## Context

Server Actions are public HTTP endpoints. Anything reachable from the browser can be
called with arbitrary arguments, whether or not the UI offers a button. Hiding the
Edit control on a note you do not own is presentation; the check in the action is
the security.

## Execution steps

1. Start every note action with `requireUser()`.
2. Pass `user.id` into the `lib/notes.ts` helper; never take a `userId` from the form payload.
3. Confirm update and delete go through `updateMany` / `deleteMany` scoped to `{ id, userId }`.
4. Map `NotAuthorizedError` to the spec message: "You are not authorized to access this note."
5. Exercise an action directly with another user's note id (devtools fetch or curl with the session cookie) and confirm zero rows change.
6. Confirm `revalidatePath` only runs after a successful, authorised write.

## Files touched

- `lib/actions/note-actions.ts`, `lib/notes.ts`

## Acceptance criteria

- [x] Update with a foreign id modifies no rows and returns the authorization message.
- [x] Delete with a foreign id removes nothing.
- [x] Pin toggle with a foreign id changes nothing.
- [x] No action trusts a user id supplied by the client.
- [x] A forged request produces no partial write.

## Out of scope

- CSRF hardening beyond the framework defaults; note it for review.

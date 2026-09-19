# DB-002 — User and Note schema

**Area:** Database
**Depends on:** DB-001
**Blocks:** AUTH-001, AUTHZ-001, DEP-001
**Size:** M
**Spec reference:** §14

## Goal

The `User` and `Note` tables exist exactly as the spec describes, with the
relationship and the indexes the dashboard query needs.

## Context

`Note.content` must be `@db.Text`, not the default `varchar`, because notes are
long. The composite index on `[userId, isPinned, updatedAt]` matches the dashboard's
sort — owner's notes, pinned first, newest first — so the list stays fast as a user
accumulates notes. `onDelete: Cascade` means deleting an account takes its notes with it.

## Execution steps

1. Model `User`: `id` (cuid), `name`, `email` (`@unique`), `password`, `createdAt`, `updatedAt`.
2. Model `Note`: `id`, `userId`, `title`, `content` (`@db.Text`), `isPinned` (default `false`), `createdAt`, `updatedAt`.
3. Add the relation `Note.user` → `User.notes` with `onDelete: Cascade`.
4. Add `@@index([userId, isPinned, updatedAt])` on `Note`.
5. Run `npx prisma migrate dev --name init` and commit the generated migration.
6. Open Prisma Studio and confirm both tables and the unique email constraint.

## Files touched

- `prisma/schema.prisma`, `prisma/migrations/**`

## Acceptance criteria

- [ ] Both tables match the field list in §14.
- [ ] `email` is unique at the database level, not only in application code.
- [ ] `content` is a text column with no practical length cap.
- [ ] The migration is committed and replays cleanly on an empty database.
- [ ] Deleting a user deletes that user's notes.

## Out of scope

- Tags and categories: §22 Version 2.

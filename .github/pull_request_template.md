## Notes

<!-- What this PR does and why. -->

## Checklist

- [ ] Ticket id in the branch name and commit subject.
- [ ] `npm run typecheck` and `npm run lint` pass.
- [ ] No `prisma.note` call outside `lib/notes.ts` — every note query goes through the data access layer with `userId` first. A call elsewhere is a bug even if it works today.
- [ ] Writes are scoped with `{ id, userId }` (`updateMany` / `deleteMany`); nobody outside the owner is touched.
- [ ] New pages live in the `(dashboard)` group or are covered by `requireUser()`.
- [ ] No secrets, keys, or `.env` values committed.
- [ ] Acceptance criteria on the ticket are ticked and verified.
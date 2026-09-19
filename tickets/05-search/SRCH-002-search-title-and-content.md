# SRCH-002 — Search title and content

**Area:** Search
**Depends on:** SRCH-001
**Blocks:** SRCH-003
**Size:** S
**Spec reference:** §10, §20

## Goal

Searching "React" returns every note with that word in the title or the body,
whatever the casing.

## Context

The MVP uses `contains` with `mode: "insensitive"`, which is a substring match, not
full-text ranking. That is the right size for a personal notebook and avoids setting
up `tsvector` columns. If note counts grow into the thousands, revisit with a
PostgreSQL full-text index.

The filter must sit inside the same `where` as `userId` — an `OR` block that escapes
the ownership scope would leak every user's notes, which is exactly the bug row 6 of
AUTHZ-004 checks for.

## Execution steps

1. Extend `listNotes(userId, query?)` with an `OR` over title and content using `contains` and `mode: "insensitive"`.
2. Keep `userId` as a sibling condition of the `OR`, never inside it.
3. Trim the query and ignore an empty string so a stray space does not filter everything out.
4. Preserve the pinned-first, recently-updated ordering within results.
5. Show the active query and result count in the dashboard header.
6. Test: a word only in a title, only in content, mixed case, a word from another user's note.

## Files touched

- `lib/notes.ts`, `app/(dashboard)/dashboard/page.tsx`

## Acceptance criteria

- [ ] Title matches are returned.
- [ ] Content matches are returned.
- [ ] Matching is case-insensitive.
- [ ] Results stay scoped to the signed-in user.
- [ ] Pinned ordering is preserved inside results.

## Out of scope

- Ranking, fuzzy matching, and highlighting matched terms.

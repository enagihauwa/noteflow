# UX-003 — Form validation with Zod

**Area:** UX and quality
**Depends on:** NOTE-001, AUTH-003
**Blocks:** UX-004
**Size:** M
**Spec reference:** §12, §20

## Goal

One set of rules, enforced on the server, reported next to the field that broke them.

## Context

Client-side validation is a convenience; the server check is the real one, because
Server Actions are callable directly. Sharing the Zod schema between the two means
they can never disagree. `fieldErrors` from `error.flatten()` maps straight onto
inputs.

## Execution steps

1. Keep every schema in `lib/validations.ts`: `signUpSchema`, `signInSchema`, `noteSchema`.
2. Trim strings and lowercase emails in the schema, not in each caller.
3. Parse with `safeParse` at the top of every action and return `{ ok: false, fieldErrors }` on failure.
4. Render errors with `components/FieldError.tsx`, one message per field.
5. Preserve the user's input when an action returns errors — never clear the form.
6. Mirror the constraints in the markup (`required`, `maxLength`) for immediate feedback.
7. Test each field against its rule, including whitespace-only values.

## Files touched

- `lib/validations.ts`, `lib/actions/*.ts`, `components/FieldError.tsx`, all form components

## Acceptance criteria

- [x] Every action validates before touching the database.
- [x] Errors appear beside the field that caused them.
- [x] Input survives a failed submission.
- [x] Whitespace-only values are rejected as empty.
- [x] Client and server rules come from the same schema.

## Out of scope

- Validating as the user types; on submit is enough for the MVP.

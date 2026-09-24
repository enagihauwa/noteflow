# AUTH-007 — Auth error messages

**Area:** Authentication
**Depends on:** AUTH-003, AUTH-004
**Blocks:** —
**Size:** S
**Spec reference:** §12

## Goal

Every failure in the auth flows says what happened and what to do, in one voice.

## Context

The spec fixes several strings; use them verbatim so the copy matches the
acceptance criteria. Errors describe the problem and the fix; they do not apologise
and are never vague. Field-level problems attach to the field; credential failures
sit above the submit button.

## Execution steps

1. Collect the strings in one module so they are not retyped per form: invalid credentials, duplicate email, mismatched passwords, weak password, generic failure.
2. Render field errors with `role="alert"` and tie them to inputs via `aria-describedby`.
3. Show one message per field — the first — rather than a stack of Zod messages.
4. Keep an unexpected server failure generic: "Something went wrong. Please try again." Log the real cause server-side.
5. Confirm no message leaks whether an email is registered.
6. Walk every failure path listed in §12 and compare against the spec wording.

## Files touched

- `lib/errors.ts`, `components/FieldError.tsx`, `components/LoginForm.tsx`, `components/SignUpForm.tsx`

## Acceptance criteria

- [x] Every message in §12 appears in the product with matching wording.
- [x] Errors are announced to screen readers.
- [x] No stack trace or database error reaches the browser.
- [x] Error styling is consistent across both forms.

## Out of scope

- Internationalisation.

# AUTH-004 — Login flow

**Area:** Authentication
**Depends on:** AUTH-002
**Blocks:** AUTH-007
**Size:** M
**Spec reference:** §6.1, §13.3, §19

## Goal

A returning user signs in at `/login` and lands where they were heading.

## Context

One message covers both a wrong password and an unknown email: "Invalid email or
password." Distinguishing them tells an attacker which addresses are registered.

Auth.js signals a failed credential check by throwing `AuthError`, while a successful
`signIn` also throws — a redirect. Catch `AuthError` specifically and rethrow
everything else, or successful logins will look like failures.

## Execution steps

1. Add `signInSchema` (email, non-empty password) to `lib/validations.ts`.
2. Write `loginAction` that parses, calls `signIn("credentials", { redirectTo })` and catches `AuthError`.
3. Build `components/LoginForm.tsx` with `useActionState`, `autoComplete="current-password"` and a form-level error slot.
4. Read the `from` query parameter set by the middleware and use it as `redirectTo`, defaulting to `/dashboard`.
5. Validate that `from` is a relative path before redirecting, so it cannot be used as an open redirect.
6. Test: correct credentials, wrong password, unknown email, blank fields, deep link to `/notes/<id>` while signed out.

## Files touched

- `app/(auth)/login/page.tsx`, `components/LoginForm.tsx`, `lib/actions/auth-actions.ts`, `lib/validations.ts`

## Acceptance criteria

- [x] Correct credentials land on `/dashboard`, or on the page the user first requested.
- [x] Wrong password and unknown email produce the identical message.
- [x] A successful login is not reported as an error by the redirect throw.
- [x] `from` cannot send the user to an external domain.
- [x] The password field is never echoed back into the HTML.

## Out of scope

- "Remember me", magic links, lockout after N attempts.

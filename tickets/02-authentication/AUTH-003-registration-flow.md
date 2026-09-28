# AUTH-003 — Registration flow

**Area:** Authentication
**Depends on:** AUTH-002
**Blocks:** AUTH-007
**Size:** M
**Spec reference:** §6.1, §13.2, §19

## Goal

A visitor creates an account from `/signup` and arrives on their empty dashboard,
already signed in.

## Context

Uniqueness is enforced twice on purpose: a pre-check gives a friendly message on the
email field, and the database unique constraint catches the race where two requests
register the same address at once. Handle the Prisma `P2002` error as the same
user-facing message rather than a crash.

## Execution steps

1. Add `signUpSchema` to `lib/validations.ts`: name, email, password, confirmPassword, with a `refine` for the match.
2. Write `registerAction` in `lib/actions/auth-actions.ts` as a Server Action returning `ActionState`.
3. In the action: parse with Zod, return field errors on failure, check for an existing email, hash, create the user.
4. Sign the new user in immediately with `signIn("credentials", { ..., redirectTo: "/dashboard" })`.
5. Build `components/SignUpForm.tsx` as a client component using `useActionState`, with labelled inputs and inline errors.
6. Catch Prisma `P2002` and surface "An account already exists with this email."
7. Test: valid signup, mismatched passwords, weak password, duplicate email, blank fields.

## Files touched

- `app/(auth)/signup/page.tsx`, `components/SignUpForm.tsx`, `lib/actions/auth-actions.ts`, `lib/validations.ts`

## Acceptance criteria

- [x] A valid signup creates a user and lands on `/dashboard` already authenticated.
- [x] A duplicate email shows the message on the email field and creates nothing.
- [x] Mismatched passwords show the error on the confirm field.
- [x] Errors do not clear the name and email the user already typed.
- [x] The submit button disables while the request is in flight.

## Out of scope

- Email verification, captcha, terms checkbox.

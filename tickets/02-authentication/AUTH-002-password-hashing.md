# AUTH-002 — Password hashing

**Area:** Authentication
**Depends on:** AUTH-001
**Blocks:** AUTH-003, AUTH-004
**Size:** S
**Spec reference:** §6.1 ("Passwords must never be stored as plain text")

## Goal

A password is hashed before it reaches the database, and a wrong password is
rejected by comparison, never by a lookup.

## Context

Hashing is the one requirement in the spec that cannot be fixed later: if plain-text
passwords are written even once, the only remedy is a forced reset for everyone.
`bcryptjs` avoids the native build step that trips up some deployment targets.

Cost factor 12 is the target. Comparison and hashing must happen on the server only;
importing bcrypt into a Client Component ships the library to the browser and tells
you the boundary is wrong.

## Execution steps

1. Install `bcryptjs` and `@types/bcryptjs`.
2. Hash on registration with `bcrypt.hash(password, 12)`.
3. Verify on login with `bcrypt.compare`, never by re-hashing and matching strings.
4. Confirm the `password` field is never selected into anything returned to the client — `authorize` returns id, name and email only.
5. Set the password policy in the Zod schema: at least 8 characters, one uppercase, one number.
6. Inspect a seeded row in Prisma Studio and confirm the stored value is a bcrypt hash.

## Files touched

- `lib/auth.ts`, `lib/actions/auth-actions.ts`, `lib/validations.ts`, `prisma/seed.ts`

## Acceptance criteria

- [ ] No row in `User` contains a readable password.
- [ ] Two accounts with the same password have different hashes (salted).
- [ ] The password hash never appears in a server response or React prop.
- [ ] A password below the policy is rejected before it reaches the database.

## Out of scope

- Rate limiting login attempts; note it as a follow-up.

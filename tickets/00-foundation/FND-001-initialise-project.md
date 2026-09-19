# FND-001 — Initialise the Next.js project

**Area:** Foundation
**Depends on:** —
**Blocks:** FND-002, FND-003, FND-005, DB-001
**Size:** S
**Spec reference:** §15, §17, §18 Phase 1

## Goal

A running Next.js 15 App Router project in TypeScript, committed to GitHub, that
everyone on the team can clone and start.

## Context

App Router with Server Actions is the default in this project; there is no
`pages/` directory and no separate Express API. Keep the `@/*` path alias so
imports read `@/lib/notes` rather than a chain of `../`.

## Execution steps

1. Scaffold the app: `npx create-next-app@latest noteflow --typescript --app --eslint --src-dir=false --import-alias "@/*"`.
2. Delete the generated marketing boilerplate from `app/page.tsx` and `app/globals.css`.
3. Confirm `tsconfig.json` has `"strict": true` and the `@/*` path alias.
4. Add the scripts the team will use: `dev`, `build`, `start`, `lint`, `typecheck`.
5. Create the GitHub repository, push `main`, and protect it so changes arrive by pull request.
6. Verify `npm run dev` serves on port 3000 and `npm run typecheck` is clean.

## Files touched

- `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`

## Acceptance criteria

- [ ] `npm run dev` starts without warnings.
- [ ] `npm run typecheck` and `npm run build` both pass on a clean clone.
- [ ] TypeScript strict mode is on.
- [ ] The repository is on GitHub with `main` protected.

## Out of scope

- Styling (FND-002), database (DB-001), auth (AUTH-001).

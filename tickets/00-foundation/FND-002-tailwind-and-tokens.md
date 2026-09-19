# FND-002 — Tailwind and design tokens

**Area:** Foundation
**Depends on:** FND-001
**Blocks:** FND-004, UX-005
**Size:** S
**Spec reference:** §15, §18 Phase 1

## Goal

One place defines colour, type and spacing so no screen invents its own greys.

## Context

Tailwind v4 is configured through CSS, not a `tailwind.config.js`. Tokens live in
an `@theme` block in `app/globals.css`. The palette is deliberately small: paper,
surface, ink, muted, line, one moss accent for interactive text, one amber reserved
for the pinned marker, one red for errors. If a screen needs a colour that is not a
token, that is a design decision, not a CSS decision.

## Execution steps

1. Install `tailwindcss` and `@tailwindcss/postcss`; add `postcss.config.mjs`.
2. Add `@import "tailwindcss";` at the top of `app/globals.css`.
3. Define the `@theme` tokens: `--color-paper`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-line`, `--color-moss`, `--color-amber`, `--color-alert`.
4. Set the two font stacks: a sans for the interface, a serif for note titles and page headings; expose the serif as a `.display` class.
5. Add the base rules: body background and colour, a visible `:focus-visible` ring, and a `prefers-reduced-motion` block.
6. Render a throwaway page using each token to confirm they resolve.

## Files touched

- `app/globals.css`, `postcss.config.mjs`, `package.json`

## Acceptance criteria

- [ ] Tailwind utilities apply in a page component.
- [ ] Every token resolves in the browser (no empty `var()` fallbacks).
- [ ] Keyboard focus is visible on links, buttons and inputs.
- [ ] Reduced-motion users get no transitions.

## Out of scope

- Dark mode: listed as a Could-Have in §21.

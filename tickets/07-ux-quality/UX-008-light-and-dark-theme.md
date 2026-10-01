# UX-008 — Light and dark theme

**Area:** UX and quality
**Depends on:** FND-002, FND-004
**Blocks:** —
**Size:** M
**Spec reference:** §21 (Could-Have)

## Goal

A signed-in user can switch between a light and a dark palette, and the choice
survives a reload. Nothing on screen is left unreadable in either scheme.

## Context

FND-002 listed dark mode as out of scope, so the palette was single-scheme. The
tokens are the seam that makes it cheap: every colour in the app is a
`var(--color-*)` name, so a second set of values under a `.dark` class re-skins
the whole app without touching a single component. Two things are not free:

- **The server cannot know the theme.** The first paint would be light and then
  flash. `lib/theme-constants.ts` builds a small script that runs in `<head>`
  before the body renders; it applies the stored choice, or the OS preference
  when nothing is stored.
- **Accents cannot be reused verbatim.** A mid-blue with white label text stops
  clearing contrast on a dark page, so the dark scheme lightens `--color-cta` and
  flips the label to `--color-cta-fg` (dark on light). Same for the destructive
  button and `--color-alert-fg`.

Hardcoded hexes are the thing that silently defeats this: a `#2563eb` in a
component ignores the scheme. Every literal was replaced with a token, including
the `BrandMark` SVG fills, which now use `fill="var(--color-cta)"` rather than
`currentColor` so the mark keeps its two-tone contrast in both schemes.

The card shadows became tokens too (`--elev-card`, `--elev-card-hover`). The soft
ink shadow that reads as elevation on paper is invisible on a dark page, and
those shadows now carry the depth the removed container borders used to.

## Execution steps

1. Add the light values for the new tokens (`--color-line-strong`,
   `--color-cta-hover`, `--color-cta-active`, `--color-cta-fg`,
   `--color-cta-ring`, `--color-alert-fg`) and the elevation vars to the
   `@theme` block in `app/globals.css`.
2. Add a `.dark` block overriding every one of those names, plus
   `color-scheme: dark` so native widgets follow. Leave it unlayered: `@theme`
   emits into `@layer theme`, and unlayered rules win without a specificity fight.
3. Put `themeBootstrapScript()` in the root layout `<head>` and add
   `suppressHydrationWarning` to `<html>`, since the class changes before React
   hydrates.
4. Build `components/ThemeToggle.tsx`: read the applied theme back from
   `<html>` (not from state — the bootstrap script is what decided it), toggle
   the class, persist to `localStorage`, and label the button with the theme it
   switches *to*.
5. Render it in the navbar next to the logout button.
6. Replace every hardcoded hex and `text-white` on a coloured background with a
   token.
7. Check both schemes at 360px: form labels on inputs, the dashed empty state,
   the pinned pin, the delete confirmation, the error banners.

## Files touched

- `app/globals.css`, `app/layout.tsx`
- `components/ThemeToggle.tsx`, `components/Navbar.tsx`
- `lib/theme-constants.ts`
- every component that hardcoded a hex

## Acceptance criteria

- [ ] The toggle switches the whole app, including the auth pages and the landing page.
- [ ] A reload keeps the choice; with nothing stored, the OS preference wins.
- [ ] No white flash before hydration in either scheme.
- [ ] No hardcoded colour remains in a component; every colour is a token.
- [ ] Body text, labels and button text clear 4.5:1 in both schemes.
- [ ] The toggle is reachable by keyboard with a visible focus ring, and its
      accessible name names the theme it switches to.

## Out of scope

- A "match system" third state, or following the OS after the user has chosen.
- Theming per route, or a user-selectable accent.
- The toggle on the landing and auth pages — it lives in the navbar, so those
  screens follow the stored choice but cannot change it.

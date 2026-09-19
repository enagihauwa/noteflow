# UX-006 — Accessibility pass

**Area:** UX and quality
**Depends on:** UX-005
**Blocks:** DEP-003
**Size:** M
**Spec reference:** §18 Phase 5

## Goal

The whole product is usable with a keyboard and a screen reader.

## Context

Nothing here is retrofitting if the earlier tickets were done: labelled inputs,
`role="alert"` errors, `aria-pressed` on the pin, a real form for logout. This pass
verifies the whole and fixes what slipped.

## Execution steps

1. Tab through every screen; confirm a visible focus ring and a sensible order.
2. Confirm every input has a real `<label>`, not a placeholder standing in for one.
3. Check colour contrast for body text, muted text and the amber marker against their backgrounds.
4. Confirm every icon-only control has an accessible name.
5. Move focus deliberately after the delete confirmation appears and after a redirect.
6. Run the delete flow, the pin toggle and search with a screen reader.
7. Run an automated audit (Lighthouse or axe) and fix what it finds.

## Files touched

- `components/**`, `app/**`

## Acceptance criteria

- [ ] Every flow in §23 is completable with the keyboard alone.
- [ ] Focus is always visible and never trapped.
- [ ] Text contrast meets WCAG AA.
- [ ] Errors and state changes are announced.
- [ ] The automated audit reports no critical issues.

## Out of scope

- A formal WCAG AAA audit.

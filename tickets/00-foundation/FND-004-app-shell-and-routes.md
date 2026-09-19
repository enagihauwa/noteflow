# FND-004 — App shell and route groups

**Area:** Foundation
**Depends on:** FND-002
**Blocks:** AUTH-005, NOTE-002, UX-005, UX-007
**Size:** M
**Spec reference:** §13, §17

## Goal

Every screen in the spec has a URL and a placeholder, and the public and private
halves of the app are separated at the folder level.

## Context

Two route groups carry the split. `(auth)` holds the public login and sign-up pages
with a narrow centred layout. `(dashboard)` holds everything private; its layout is
where the session guard will live in AUTH-005, which is why no private page should
ever sit outside it.

## Execution steps

1. Create `app/(auth)/layout.tsx` with the narrow card layout, plus `login/page.tsx` and `signup/page.tsx`.
2. Create `app/(dashboard)/layout.tsx` with the navbar and a max-width container.
3. Create the private pages: `dashboard/page.tsx`, `notes/new/page.tsx`, `notes/[id]/page.tsx`, `notes/[id]/edit/page.tsx`.
4. Build `components/Navbar.tsx`: product name linking to the dashboard, a greeting slot and a logout slot.
5. Set the document title and description in `app/layout.tsx`.
6. Add `app/not-found.tsx` so unknown ids and URLs land somewhere deliberate.

## Files touched

- `app/(auth)/**`, `app/(dashboard)/**`, `components/Navbar.tsx`, `app/layout.tsx`, `app/not-found.tsx`

## Acceptance criteria

- [ ] All seven screens in §13 resolve to a URL.
- [ ] The two route groups have distinct layouts.
- [ ] No private page lives outside `(dashboard)`.
- [ ] An unknown URL renders the not-found page.

## Out of scope

- Real data and the real guard; placeholders are fine here.

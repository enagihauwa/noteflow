# UX-002 — Loading states

**Area:** UX and quality
**Depends on:** NOTE-002
**Blocks:** —
**Size:** S
**Spec reference:** §21 Should Have, §20

## Goal

Nothing in the app is ever silently busy.

## Context

On a slow connection the gap between a click and a result is where users click twice
and create duplicates. Skeletons should match the shape of the content they stand in
for, so the page does not jump when real data lands.

## Execution steps

1. Add `app/(dashboard)/dashboard/loading.tsx` rendering `NoteSkeleton` cards in the real grid.
2. Build `components/notes/NoteSkeleton.tsx` matching `NoteCard` dimensions.
3. Build `components/ui/SubmitButton.tsx` using `useFormStatus` to disable and relabel while pending.
4. Use it on every form: signup, login, create, edit.
5. Show the quiet pending hint in the search bar during a transition.
6. Throttle the network in devtools to "Slow 3G" and walk every flow.

## Files touched

- `app/(dashboard)/dashboard/loading.tsx`, `components/notes/NoteSkeleton.tsx`, `components/ui/SubmitButton.tsx`

## Acceptance criteria

- [x] Every submit button disables and relabels while pending.
- [x] The dashboard shows skeletons, not a blank screen, on a slow load.
- [x] Skeletons do not cause a layout shift when content arrives.
- [x] Double submission cannot create two notes.

## Out of scope

- A global progress bar.

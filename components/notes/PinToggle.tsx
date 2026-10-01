"use client";

import { useTransition } from "react";
import { togglePinAction } from "@/lib/actions/note-actions";

// PIN-001 — one button, the label always says what happens next. The action
// re-reads the note from the database, so a stale page cannot flip the wrong way.
export function PinToggle({
  noteId,
  isPinned,
  className,
}: {
  noteId: string;
  isPinned: boolean;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-pressed={isPinned}
      disabled={pending}
      onClick={() => startTransition(() => void togglePinAction(noteId))}
      className={`${className ?? ""} inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--color-cta)] px-2 text-xs text-[var(--color-cta)]`}
    >
      {isPinned ? "Unpin" : "Pin"}
    </button>
  );
}
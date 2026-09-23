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
      className={`${className ?? ""} rounded-md border border-[#2563eb] px-2 py-1 text-xs text-[#2563eb]`}
    >
      {isPinned ? "Unpin" : "Pin"}
    </button>
  );
}
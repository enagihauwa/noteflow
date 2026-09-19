"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteNoteAction, togglePinAction } from "@/lib/actions/note-actions";

// PIN-001 + NOTE-005
export function NoteActions({ noteId, isPinned }: { noteId: string; isPinned: boolean }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => startTransition(() => void togglePinAction(noteId))}
        disabled={pending}
        aria-pressed={isPinned}
        className="rounded-md border border-[var(--color-line)] px-3 py-1.5"
      >
        {isPinned ? "Unpin" : "Pin"}
      </button>

      <Link href={`/notes/${noteId}/edit`} className="rounded-md border border-[var(--color-line)] px-3 py-1.5">
        Edit
      </Link>

      {confirming ? (
        <span className="flex items-center gap-2">
          <button
            onClick={() => startTransition(() => void deleteNoteAction(noteId))}
            disabled={pending}
            className="rounded-md bg-[var(--color-alert)] px-3 py-1.5 text-white"
          >
            Delete for good
          </button>
          <button onClick={() => setConfirming(false)} className="text-[var(--color-muted)]">
            Keep
          </button>
        </span>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="rounded-md border border-[var(--color-line)] px-3 py-1.5"
        >
          Delete
        </button>
      )}
    </div>
  );
}

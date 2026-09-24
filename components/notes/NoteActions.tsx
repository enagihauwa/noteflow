"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { deleteNoteAction } from "@/lib/actions/note-actions";
import { PinToggle } from "@/components/notes/PinToggle";

// NOTE-005 + PIN-001
export function NoteActions({ noteId, isPinned }: { noteId: string; isPinned: boolean }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!confirming) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setConfirming(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (wrapRef.current && e.target instanceof Node && !wrapRef.current.contains(e.target)) {
        setConfirming(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [confirming]);

  const cancel = () => {
    setConfirming(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={wrapRef} className="flex flex-wrap items-center gap-2 text-sm">
      <PinToggle noteId={noteId} isPinned={isPinned} className="px-3 py-1.5 text-sm" />

      <Link
        href={`/notes/${noteId}/edit`}
        className="inline-flex min-h-11 items-center rounded-md border border-[#2563eb] px-3 py-1.5"
      >
        Edit
      </Link>

      {confirming ? (
        <span role="alert" className="flex flex-wrap items-center gap-2">
          <button
            autoFocus
            onClick={() => startTransition(() => void deleteNoteAction(noteId))}
            disabled={pending}
            className="inline-flex min-h-11 items-center rounded-md bg-[var(--color-alert)] px-3 py-1.5 text-white"
          >
            Delete for good
          </button>
          <button
            onClick={cancel}
            className="inline-flex min-h-11 items-center text-[var(--color-muted)]"
          >
            Keep
          </button>
        </span>
      ) : (
        <button
          ref={triggerRef}
          onClick={() => setConfirming(true)}
          className="inline-flex min-h-11 items-center rounded-md border border-[#2563eb] px-3 py-1.5"
        >
          Delete
        </button>
      )}
    </div>
  );
}
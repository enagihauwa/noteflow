import Link from "next/link";
import type { Note } from "@prisma/client";
import { PinToggle } from "@/components/notes/PinToggle";

// NOTE-002 + PIN-001 — the card navigates to the note, with a pin toggle that
// floats above the link's top-right corner as a sibling (never nested inside the
// link, which would be invalid interactive nesting).
export function NoteCard({ note, query }: { note: Note; query?: string }) {
  const href = query ? `/notes/${note.id}?q=${encodeURIComponent(query)}` : `/notes/${note.id}`;
  return (
    <div className="relative rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
      <Link href={href} className="block">
        <h3 className="display flex items-center gap-2 text-lg leading-snug">
          {note.isPinned && (
            <span
              aria-label="Pinned"
              className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-amber)]"
            />
          )}
          {note.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-[var(--color-muted)]">{note.content}</p>
        <p className="mt-4 text-xs text-[var(--color-muted)]">
          {note.updatedAt.toLocaleDateString()}
        </p>
      </Link>
      <PinToggle
        noteId={note.id}
        isPinned={note.isPinned}
        className="absolute right-3 top-3 border-transparent"
      />
    </div>
  );
}
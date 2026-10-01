import Link from "next/link";
import type { Note } from "@/lib/types";
import { PinToggle } from "@/components/notes/PinToggle";

// NOTE-002 + PIN-001 — the card navigates to the note, with a pin toggle that
// floats above the link's top-right corner as a sibling (never nested inside the
// link, which would be invalid interactive nesting).
export function NoteCard({ note, query }: { note: Note; query?: string }) {
  const href = query ? `/notes/${note.id}?q=${encodeURIComponent(query)}` : `/notes/${note.id}`;
  return (
    <div className="relative rounded-lg bg-[var(--color-surface)] p-5 shadow-[0_10px_30px_-12px_rgba(28,32,36,0.18),0_2px_8px_-4px_rgba(28,32,36,0.08)] transition-shadow hover:shadow-[0_14px_38px_-12px_rgba(28,32,36,0.26),0_3px_10px_-4px_rgba(28,32,36,0.12)]">
      <Link href={href} className="block">
        <h3 className="display flex items-center gap-2 text-lg leading-snug [overflow-wrap:anywhere]">
          {note.isPinned && (
            <span className="flex shrink-0 items-center text-[var(--color-alert)]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"
                />
              </svg>
              <span className="sr-only">Pinned</span>
            </span>
          )}
          {note.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-[var(--color-muted)] [overflow-wrap:anywhere]">
          {note.content}
        </p>
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
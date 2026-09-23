import Link from "next/link";
import type { Note } from "@prisma/client";

export function NoteCard({ note, query }: { note: Note; query?: string }) {
  const href = query ? `/notes/${note.id}?q=${encodeURIComponent(query)}` : `/notes/${note.id}`;
  return (
    <Link
      href={href}
      className="block rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="display text-lg leading-snug">{note.title}</h3>
        {note.isPinned && (
          <span
            aria-label="Pinned"
            className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-amber)]"
          />
        )}
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-[var(--color-muted)]">{note.content}</p>
      <p className="mt-4 text-xs text-[var(--color-muted)]">
        {note.updatedAt.toLocaleDateString()}
      </p>
    </Link>
  );
}

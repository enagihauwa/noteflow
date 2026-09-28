import type { Note } from "@prisma/client";
import { NoteCard } from "@/components/notes/NoteCard";

export function NoteList({
  heading,
  notes,
  query,
}: {
  heading?: string;
  notes: Note[];
  query?: string;
}) {
  return (
    <section>
      {heading && (
        <h2 className="mb-3 text-sm font-medium text-[var(--color-muted)]">{heading}</h2>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} query={query} />
        ))}
      </div>
    </section>
  );
}

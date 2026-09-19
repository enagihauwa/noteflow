import type { Note } from "@prisma/client";
import { NoteCard } from "@/components/notes/NoteCard";

export function NoteList({ heading, notes }: { heading?: string; notes: Note[] }) {
  return (
    <section>
      {heading && (
        <h2 className="mb-3 text-sm font-medium text-[var(--color-muted)]">{heading}</h2>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </section>
  );
}

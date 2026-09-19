import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { getNote } from "@/lib/notes";
import { NotAuthorizedError, NotFoundError } from "@/lib/errors";
import { NoteActions } from "@/components/notes/NoteActions";

// NOTE-003 + AUTHZ-002
export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;

  let note;
  try {
    note = await getNote(user.id, id);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    if (error instanceof NotAuthorizedError) {
      // Same response as "missing" so ids cannot be probed.
      notFound();
    }
    throw error;
  }

  return (
    <article className="mx-auto max-w-2xl">
      <Link href="/dashboard" className="text-sm text-[var(--color-muted)]">
        ← All notes
      </Link>
      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <h1 className="display text-3xl">{note.title}</h1>
        <NoteActions noteId={note.id} isPinned={note.isPinned} />
      </header>
      <p className="mt-2 text-xs text-[var(--color-muted)]">
        Updated {note.updatedAt.toLocaleString()}
      </p>
      <div className="mt-6 whitespace-pre-wrap text-[17px] leading-relaxed">{note.content}</div>
    </article>
  );
}

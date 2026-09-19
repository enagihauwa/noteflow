import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { getNote } from "@/lib/notes";
import { NotAuthorizedError, NotFoundError } from "@/lib/errors";
import { NoteForm } from "@/components/notes/NoteForm";

// NOTE-004 + AUTHZ-003
export default async function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;

  let note;
  try {
    note = await getNote(user.id, id);
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof NotAuthorizedError) notFound();
    throw error;
  }

  return (
    <>
      <h1 className="display text-2xl">Edit note</h1>
      <NoteForm mode="edit" noteId={note.id} defaultTitle={note.title} defaultContent={note.content} />
    </>
  );
}

import { NoteForm } from "@/components/notes/NoteForm";

// NOTE-001
export default function NewNotePage() {
  return (
    <>
      <h1 className="display text-2xl">New note</h1>
      <NoteForm mode="create" />
    </>
  );
}

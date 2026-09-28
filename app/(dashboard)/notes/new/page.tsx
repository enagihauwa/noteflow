import { NoteForm } from "@/components/notes/NoteForm";

// NOTE-001
export default async function NewNotePage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  const { title } = await searchParams;
  return (
    <>
      <h1 className="display text-2xl">New note</h1>
      <NoteForm mode="create" defaultTitle={title} />
    </>
  );
}
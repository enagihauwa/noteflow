import Link from "next/link";
import { requireUser } from "@/lib/session";
import { listNotes } from "@/lib/notes";
import { SearchBar } from "@/components/SearchBar";
import { NoteList } from "@/components/notes/NoteList";
import { EmptyState } from "@/components/EmptyState";

// NOTE-002 (list), SRCH-002 (query), PIN-002 (grouping)
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await requireUser();
  const { q } = await searchParams;
  const query = q?.trim() || undefined;
  const notes = await listNotes(user.id, query);

  const pinned = notes.filter((n) => n.isPinned);
  const rest = notes.filter((n) => !n.isPinned);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-3xl">Your notes</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
            {query ? ` matching “${query}”` : ""}
          </p>
        </div>
        <Link
          href="/notes/new"
          className="rounded-md bg-[#2563eb] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1d4ed8]"
        >
          New note
        </Link>
      </div>

      <div className="mt-6">
        <SearchBar defaultValue={query} />
      </div>

      {notes.length === 0 ? (
        <EmptyState query={query} />
      ) : (
        <div className="mt-8 space-y-10">
          {pinned.length > 0 && <NoteList heading="Pinned" notes={pinned} query={query} />}
          {rest.length > 0 && (
            <NoteList heading={pinned.length > 0 ? "Everything else" : undefined} notes={rest} query={query} />
          )}
        </div>
      )}
    </>
  );
}

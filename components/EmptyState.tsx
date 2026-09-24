import Link from "next/link";

// UX-001 and SRCH-003 — two different empty screens, one component.
export function EmptyState({ query }: { query?: string }) {
  if (query) {
    return (
      <div className="mt-12 rounded-lg border border-dashed border-[var(--color-line)] p-10 text-center">
        <p className="display text-xl">No notes found.</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Nothing matches “{query}”. Try a shorter word.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 max-w-full items-center rounded-md border border-[#2563eb] px-4 font-medium text-[#2563eb]"
          >
            Clear search
          </Link>
          <Link
            href={`/notes/new?title=${encodeURIComponent(query)}`}
            className="inline-flex min-h-11 max-w-full items-center rounded-md bg-[#2563eb] px-4 font-medium text-white transition-colors hover:bg-[#1d4ed8] [overflow-wrap:anywhere]"
          >
            Create a note named “{query}”
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-lg border border-dashed border-[var(--color-line)] p-10 text-center">
      <p className="display text-xl">You don&apos;t have any notes yet.</p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Write the first one now.</p>
      <Link
        href="/notes/new"
        className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[#2563eb] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1d4ed8]"
      >
        Create a note
      </Link>
    </div>
  );
}

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
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-lg border border-dashed border-[var(--color-line)] p-10 text-center">
      <p className="display text-xl">You don&apos;t have any notes yet.</p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Write the first one now.</p>
      <Link
        href="/notes/new"
        className="mt-6 inline-block rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white"
      >
        Create a note
      </Link>
    </div>
  );
}

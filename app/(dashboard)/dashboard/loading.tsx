import { NoteSkeleton } from "@/components/notes/NoteSkeleton";

// UX-002 — mirrors the dashboard page structure so content landing does not shift it.
export default function Loading() {
  return (
    <>
      <p className="sr-only">Loading your notes…</p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="h-9 w-48 rounded bg-[var(--color-line)]" />
          <div className="mt-1 h-5 w-32 rounded bg-[var(--color-line)]" />
        </div>
        <div className="h-9 w-24 rounded-md bg-[var(--color-line)]" />
      </div>
      <div className="mt-6">
        <div className="h-10 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <NoteSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

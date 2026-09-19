import { NoteSkeleton } from "@/components/notes/NoteSkeleton";

// UX-002
export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-9 w-48 rounded bg-[var(--color-line)]" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <NoteSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

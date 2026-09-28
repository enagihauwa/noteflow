export function NoteSkeleton() {
  return (
    <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
      <div className="h-6 w-2/3 rounded bg-[var(--color-line)]" />
      <div className="mt-2 space-y-2">
        <div className="h-5 w-full rounded bg-[var(--color-line)]" />
        <div className="h-5 w-5/6 rounded bg-[var(--color-line)]" />
        <div className="h-5 w-4/6 rounded bg-[var(--color-line)]" />
      </div>
      <div className="mt-4 h-4 w-1/3 rounded bg-[var(--color-line)]" />
    </div>
  );
}

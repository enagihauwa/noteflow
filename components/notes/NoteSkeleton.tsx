export function NoteSkeleton() {
  return (
    <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
      <div className="h-5 w-2/3 rounded bg-[var(--color-line)]" />
      <div className="mt-3 h-3 w-full rounded bg-[var(--color-line)]" />
      <div className="mt-2 h-3 w-4/5 rounded bg-[var(--color-line)]" />
    </div>
  );
}

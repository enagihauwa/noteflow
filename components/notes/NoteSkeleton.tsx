export function NoteSkeleton() {
  return (
    <div className="rounded-lg bg-[var(--color-surface)] p-5 shadow-[0_10px_30px_-12px_rgba(28,32,36,0.18),0_2px_8px_-4px_rgba(28,32,36,0.08)]">
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

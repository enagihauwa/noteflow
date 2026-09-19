"use client";

// Global error boundary — see tickets/07-ux-quality/UX-004-error-handling.md
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6">
      <h1 className="display text-3xl">Something went wrong.</h1>
      <p className="mt-3 text-[var(--color-muted)]">The page could not load. Try again.</p>
      <button
        onClick={reset}
        className="mt-6 w-fit rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm text-white"
      >
        Try again
      </button>
    </main>
  );
}

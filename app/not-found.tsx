import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6">
      <h1 className="display text-3xl">That page does not exist.</h1>
      <p className="mt-3 text-[var(--color-muted)]">The link may be wrong, or the note was deleted.</p>
      <Link href="/dashboard" className="mt-6 text-sm font-medium text-[var(--color-moss)]">
        Back to your notes
      </Link>
    </main>
  );
}

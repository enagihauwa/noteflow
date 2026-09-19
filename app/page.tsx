import Link from "next/link";

// Landing page — see tickets/07-ux-quality/UX-007-landing-page.md
export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-sm text-[var(--color-muted)]">NoteFlow</p>
      <h1 className="display mt-4 text-5xl leading-tight sm:text-6xl">
        Capture it. Find it. Manage it.
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg text-[var(--color-muted)]">
        A private notebook for the things you need to write down fast and read back later.
        No boards, no workspaces, no setup.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/signup"
          className="rounded-md bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-white"
        >
          Create an account
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3 text-sm font-medium"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}

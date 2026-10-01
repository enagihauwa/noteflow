import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { getSession } from "@/lib/session";

// Landing page — see tickets/07-ux-quality/UX-007-landing-page.md
export default async function LandingPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16">
      <p className="flex items-center gap-2 text-2xl font-normal text-[var(--color-ink)] [font-family:var(--font-roboto-serif)]">
        <BrandMark className="h-7 w-7" />NoteFlow
      </p>
      <h1 className="display mt-4 max-w-[16ch] text-4xl leading-tight sm:text-6xl">
        Capture it. Find it. Manage it.
      </h1>
      <p className="mx-auto mt-6 w-[600px] max-w-full text-center text-lg tracking-tighter text-[var(--color-muted)]">
        A private space to quickly capture your thoughts, ideas, and notes—and find them when you need them. No boards. No workspaces. Just write.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/signup"
          className="inline-flex min-h-12 items-center rounded-md bg-[var(--color-cta)] px-7 text-lg font-medium text-[var(--color-cta-fg)] transition-colors hover:bg-[var(--color-cta-hover)]"
        >
          Create an account
        </Link>
        <Link
          href="/login"
          className="inline-flex min-h-12 items-center rounded-md border border-[var(--color-cta)] px-7 text-lg font-medium text-[var(--color-cta)] transition-colors hover:bg-[var(--color-cta)]/5"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}

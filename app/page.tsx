import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { auth } from "@/lib/auth";

// Landing page — see tickets/07-ux-quality/UX-007-landing-page.md
export default async function LandingPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16">
      <p className="flex items-center gap-2 text-2xl font-normal text-[#111111] [font-family:var(--font-roboto-serif)]">
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
          className="inline-flex min-h-12 items-center rounded-md bg-[#2563eb] px-7 text-lg font-medium text-white transition-colors hover:bg-[#1d4ed8]"
        >
          Create an account
        </Link>
        <Link
          href="/login"
          className="inline-flex min-h-12 items-center rounded-md border border-[#2563eb] px-7 text-lg font-medium text-[#2563eb] transition-colors hover:bg-[#2563eb]/5"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import { BACK_TO_NOTES, NOT_FOUND_BODY, NOT_FOUND_TITLE } from "@/lib/errors";

// Unknown routes, and missing or unauthorized notes — UX-004.
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6">
      <h1 className="display text-3xl">{NOT_FOUND_TITLE}</h1>
      <p className="mt-3 text-[var(--color-muted)]">{NOT_FOUND_BODY}</p>
      <Link href="/dashboard" className="mt-6 text-sm font-medium text-[var(--color-moss)]">
        {BACK_TO_NOTES}
      </Link>
    </main>
  );
}
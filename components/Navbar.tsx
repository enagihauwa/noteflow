import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth-actions";
import { BrandMark } from "@/components/BrandMark";

export function Navbar({ userName }: { userName: string }) {
  return (
    <header className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/dashboard"
          className="flex min-h-11 shrink-0 items-center gap-2 text-2xl font-normal text-[#111111] [font-family:var(--font-roboto-serif)]"
        >
          <BrandMark className="h-6 w-6" />
          NoteFlow
        </Link>
        <div className="flex min-w-0 items-center gap-2 text-sm sm:gap-4">
          <span className="min-w-0 truncate text-[var(--color-muted)]">Hello, {userName}</span>
          <form action={logoutAction} className="shrink-0">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

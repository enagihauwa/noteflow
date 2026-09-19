import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth-actions";

export function Navbar({ userName }: { userName: string }) {
  return (
    <header className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="display text-lg">
          NoteFlow
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-[var(--color-muted)]">Hello, {userName}</span>
          <form action={logoutAction}>
            <button type="submit" className="font-medium underline-offset-4 hover:underline">
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

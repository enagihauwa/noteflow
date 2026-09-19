import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-6 py-12">
      <Link href="/" className="display text-xl">
        NoteFlow
      </Link>
      <div className="mt-8 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
        {children}
      </div>
    </main>
  );
}

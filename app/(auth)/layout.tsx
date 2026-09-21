import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col justify-center px-6 py-12">
      <Link href="/" className="display flex items-center gap-2 text-xl">
        <BrandMark className="h-6 w-6" />
        NoteFlow
      </Link>
      <div className="mt-8 w-full rounded-[14px] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_10px_30px_-12px_rgba(28,32,36,0.18),0_2px_8px_-4px_rgba(28,32,36,0.08)]">
        {children}
      </div>
    </main>
  );
}

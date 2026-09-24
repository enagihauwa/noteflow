import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

// AUTH-004
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <>
      <h1 className="display text-2xl">Log in</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Your notes are waiting.</p>
      <LoginForm from={from} />
      <p className="mt-6 text-sm text-[var(--color-muted)]">
        No account yet?{" "}
        <Link
          href="/signup"
          className="inline-flex min-h-11 items-center font-medium text-[#2563eb] hover:underline"
        >
          Create one
        </Link>
      </p>
    </>
  );
}

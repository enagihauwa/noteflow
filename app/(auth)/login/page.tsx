import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

// AUTH-004
export default function LoginPage() {
  return (
    <>
      <h1 className="display text-2xl">Log in</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Your notes are waiting.</p>
      <LoginForm />
      <p className="mt-6 text-sm text-[var(--color-muted)]">
        No account yet?{" "}
        <Link href="/signup" className="font-medium text-[var(--color-moss)]">
          Create one
        </Link>
      </p>
    </>
  );
}

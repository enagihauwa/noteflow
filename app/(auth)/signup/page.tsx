import Link from "next/link";
import { SignUpForm } from "@/components/SignUpForm";

// AUTH-003
export default function SignUpPage() {
  return (
    <>
      <h1 className="display text-3xl">Create your account</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">It takes about thirty seconds.</p>
      <SignUpForm />
      <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
        Already registered?{" "}
        <Link
          href="/login"
          className="inline-flex min-h-11 items-center font-semibold text-[#2563eb] hover:underline"
        >
          Log in
        </Link>
      </p>
    </>
  );
}

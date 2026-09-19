import Link from "next/link";
import { SignUpForm } from "@/components/SignUpForm";

// AUTH-003
export default function SignUpPage() {
  return (
    <>
      <h1 className="display text-2xl">Create your account</h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">It takes about thirty seconds.</p>
      <SignUpForm />
      <p className="mt-6 text-sm text-[var(--color-muted)]">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-[var(--color-moss)]">
          Log in
        </Link>
      </p>
    </>
  );
}

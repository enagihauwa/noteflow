"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children, pendingLabel }: { children: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

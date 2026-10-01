"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingLabel,
  className = "",
}: {
  children: string;
  pendingLabel: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--color-cta)] px-6 text-sm font-medium text-[var(--color-cta-fg)] shadow-sm transition-colors hover:bg-[var(--color-cta-hover)] active:bg-[var(--color-cta-active)] disabled:pointer-events-none disabled:opacity-60 ${className}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
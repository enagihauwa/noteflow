"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

// SRCH-001 — the query lives in the URL so results are shareable and refreshable.
export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function onChange(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value.trim()) next.set("q", value.trim());
    else next.delete("q");
    startTransition(() => router.replace(`/dashboard?${next.toString()}`));
  }

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search your notes
      </label>
      <input
        id="search"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search titles and content"
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5 text-sm"
      />
      {pending && (
        <span className="absolute right-3 top-2.5 text-xs text-[var(--color-muted)]">Searching…</span>
      )}
    </div>
  );
}

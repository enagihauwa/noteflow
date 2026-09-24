"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

// SRCH-001 — the query lives in the URL so results are shareable and refreshable.
export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(defaultValue ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  function commit(nextValue: string) {
    const next = new URLSearchParams(params.toString());
    if (nextValue.trim()) next.set("q", nextValue.trim());
    else next.delete("q");
    startTransition(() => router.replace(`/dashboard?${next.toString()}`));
  }

  function onChange(nextValue: string) {
    setValue(nextValue);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => commit(nextValue), 300);
  }

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search your notes
      </label>
      <input
        id="search"
        type="search"
        value={value}
        placeholder="Search titles and content"
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-11 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5 text-sm"
      />
      {pending && (
        <span
          role="status"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--color-muted)]"
        >
          Searching…
        </span>
      )}
    </div>
  );
}
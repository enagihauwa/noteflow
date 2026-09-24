import { ERROR_PAGE_BODY, ERROR_PAGE_TITLE, RETRY_LABEL } from "@/lib/errors";

// Shared boundary body for the root and dashboard error pages — UX-004.
export function ErrorScreen({ onReset }: { onReset: () => void }) {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="display text-3xl">{ERROR_PAGE_TITLE}</h1>
      <p className="mt-3 text-[var(--color-muted)]">{ERROR_PAGE_BODY}</p>
      <button
        onClick={onReset}
        className="mt-6 w-fit rounded-md bg-[#2563eb] px-4 py-2 text-sm text-white transition-colors hover:bg-[#1d4ed8]"
      >
        {RETRY_LABEL}
      </button>
    </main>
  );
}
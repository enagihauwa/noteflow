/**
 * Server-side error logging — UX-004.
 *
 * The browser gets short, friendly copy from `lib/errors.ts`; the developer gets
 * the full picture here. Never pass `error` to the client. Context is a short
 * `area.operation key=value` description so a log line can be found quickly.
 */
export function serverLogError(context: string, error: unknown) {
  console.error(`[noteflow] ${context}`, error);
}

/**
 * Next calls `redirect()` by throwing an internal error. It is control flow, not
 * a failure, so it should never be logged as one.
 */
export function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}
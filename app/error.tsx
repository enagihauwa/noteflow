"use client";

import { ErrorScreen } from "@/components/ErrorScreen";

// Root error boundary — UX-004. Renders above every layout when a segment fails.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return <ErrorScreen onReset={reset} />;
}
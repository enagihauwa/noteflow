"use client";

import { ErrorScreen } from "@/components/ErrorScreen";

// Boundary for the notes area — UX-004. The dashboard layout (and its navbar)
// keeps rendering, so only the failing segment is replaced.
export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return <ErrorScreen onReset={reset} />;
}
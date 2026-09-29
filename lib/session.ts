import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionCookie } from "@/lib/firebase";
import { INVALID_SESSION_REASON, SESSION_COOKIE_NAME } from "@/lib/session-constants";
import type { SessionUser } from "@/lib/types";

// Reads and verifies the Firebase session cookie. Returns the signed-in user or
// null (no redirect) — for pages that behave differently for guests.
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionCookie(token);
}

// Returns the signed-in user or redirects to the login page. Every query in a
// protected page or action is scoped by the returned user's id — AUTH-005.
//
// The ?reason flag tells middleware this redirect came from a session cookie it
// could not clear: requireUser() also runs from the dashboard layout, a Server
// Component, where Next.js forbids mutating cookies. Without the flag,
// middleware sees the stale cookie on /login and bounces back to /dashboard,
// looping until Next.js aborts the request.
export async function requireUser(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect(`/login?reason=${INVALID_SESSION_REASON}`);
  return session;
}
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { INVALID_SESSION_REASON, SESSION_COOKIE_NAME } from "@/lib/session-constants";

const PROTECTED = ["/dashboard", "/notes"];
const AUTH_PAGES = ["/login", "/signup"];

// Cookie check only — the real guard is requireUser() in every route and action.
// See tickets/02-authentication/AUTH-005-route-protection.md
//
// The Edge runtime cannot import firebase-admin, so a cookie's validity can
// never be checked here. The two guards are reconciled by the ?reason flag that
// requireUser() sets when it rejects a cookie: that redirect is the one case
// where a cookie is present but must not be treated as a signed-in session.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

  if (!hasSession && PROTECTED.some((p) => pathname.startsWith(p))) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (hasSession && AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    const rejected = request.nextUrl.searchParams.get("reason") === INVALID_SESSION_REASON;
    if (!rejected) return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/notes/:path*", "/login", "/signup"],
};

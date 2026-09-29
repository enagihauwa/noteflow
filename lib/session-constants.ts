// Session constants that must agree across runtimes. middleware.ts runs on the
// Edge runtime, which cannot import firebase-admin, so the cookie name lives
// here instead of in lib/firebase.ts and is re-exported from there. One source
// of truth stops the two from drifting apart.
export const SESSION_COOKIE_NAME = "__session";

// requireUser() appends this to the login redirect when a session cookie is
// present but no longer verifies — expired, revoked, or the user was disabled.
// middleware.ts skips its "already signed in" bounce when it sees it, which is
// what stops an unusable cookie from bouncing /login -> /dashboard -> /login
// forever. It cannot verify the cookie itself, because the Edge runtime has no
// firebase-admin.
export const INVALID_SESSION_REASON = "session";

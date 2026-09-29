import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import "@/lib/env"; // fails loudly at boot if a required variable is missing
import { SESSION_COOKIE_NAME } from "@/lib/session-constants";
import type { SessionUser } from "@/lib/types";

// Firebase session cookies can persist for at most 14 days. The `__session`
// short name keeps the cookie usable even when the deployment is served without
// a custom domain. The name itself lives in lib/session-constants so the Edge
// middleware can share it without importing firebase-admin.
export { SESSION_COOKIE_NAME };
export const SESSION_MAX_AGE_MS = 1209600000; // 14 days

// Thrown when the Identity Toolkit REST endpoint rejects credentials.
export class AuthenticationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

// A single admin app survives hot reloads in development.
const globalForFirebase = globalThis as unknown as { __noteflowAdmin?: ReturnType<typeof initializeApp> };

function getAdminApp() {
  if (!globalForFirebase.__noteflowAdmin) {
    globalForFirebase.__noteflowAdmin = initializeApp(
      {
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      },
      "noteflow",
    );
  }
  return globalForFirebase.__noteflowAdmin;
}

export const adminAuth = getAuth(getAdminApp());
export const adminDb = getFirestore(getAdminApp());
export const serverTimestamp = FieldValue.serverTimestamp;

// Sign in with the Identity Toolkit REST endpoint (admin SDK cannot verify
// passwords). Returns a Firebase ID token, which the server then exchanges for a
// session cookie. The API key is from the public web-app config and is safe to
// send to Firebase endpoints.
export async function signInWithPassword(
  email: string,
  password: string,
  apiKey: string,
): Promise<string> {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      cache: "no-store",
    },
  );

  const body = (await response.json()) as { idToken?: string; error?: { message?: string } };
  if (!response.ok || !body.idToken) {
    throw new AuthenticationError(
      body?.error?.message ?? "Unknown sign-in error",
      body?.error?.message ?? "UNKNOWN",
    );
  }
  return body.idToken;
}

export async function createSessionCookie(idToken: string): Promise<string> {
  return adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS });
}

export async function verifySessionCookie(cookie: string): Promise<SessionUser | null> {
  try {
    const decoded = await adminAuth.verifySessionCookie(cookie, true);
    return {
      id: decoded.uid,
      name: decoded.name ?? null,
      email: decoded.email ?? null,
    };
  } catch {
    return null;
  }
}
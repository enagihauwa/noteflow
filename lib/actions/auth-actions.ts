"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  adminAuth,
  adminDb,
  AuthenticationError,
  createSessionCookie,
  serverTimestamp,
  signInWithPassword,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from "@/lib/firebase";
import { env } from "@/lib/env";
import { requireUser } from "@/lib/session";
import { signUpSchema, signInSchema } from "@/lib/validations";
import { type ActionState, DUPLICATE_EMAIL, INVALID_CREDENTIALS } from "@/lib/errors";
import { serverLogError } from "@/lib/log";

const INVALID_CREDENTIAL_CODES = new Set([
  "EMAIL_NOT_FOUND",
  "USER_NOT_FOUND",
  "INVALID_PASSWORD",
  "INVALID_LOGIN_CREDENTIALS",
  "USER_DISABLED",
]);

function isInvalidCredentialsCode(code: string) {
  return INVALID_CREDENTIAL_CODES.has(code);
}

function isDuplicateEmail(error: unknown) {
  return (error as { code?: string }).code === "auth/email-already-in-use";
}

// Signs the user in and mints the Firebase session cookie for this response.
async function setSessionCookie(email: string, password: string) {
  const idToken = await signInWithPassword(email, password, env.FIREBASE_API_KEY);
  const sessionCookie = await createSessionCookie(idToken);
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  });
}

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  let uid: string;
  try {
    const record = await adminAuth.createUser({ email, password, displayName: name });
    uid = record.uid;
  } catch (error) {
    if (isDuplicateEmail(error)) {
      return { ok: false, fieldErrors: { email: [DUPLICATE_EMAIL] } };
    }
    serverLogError("auth.register", error);
    throw error;
  }

  try {
    await adminDb.collection("users").doc(uid).set({
      name,
      email,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    serverLogError("auth.register.users", error);
    throw error;
  }

  try {
    await setSessionCookie(email, password);
  } catch (error) {
    serverLogError("auth.register.session", error);
    throw error;
  }

  redirect("/dashboard");
  return { ok: true }; // unreachable — redirect() throws
}

// The middleware writes the originally-requested path into ?from. Only accept
// same-site relative paths so the login form cannot be used as an open redirect.
function safeRedirectTo(value: unknown): string {
  if (typeof value !== "string" || value.length === 0) return "/dashboard";
  if (value.startsWith("//") || value.includes("\\")) return "/dashboard";
  const url = new URL(value, "http://localhost");
  if (url.origin !== "http://localhost") return "/dashboard";
  return url.pathname + url.search;
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await setSessionCookie(parsed.data.email, parsed.data.password);
  } catch (error) {
    if (error instanceof AuthenticationError && isInvalidCredentialsCode(error.code)) {
      return { ok: false, message: INVALID_CREDENTIALS };
    }
    serverLogError("auth.login", error);
    throw error; // unknown failures bubble up to the boundary
  }

  redirect(safeRedirectTo(formData.get("from")));
}

export async function logoutAction() {
  await requireUser();
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}
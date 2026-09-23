"use server";

import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { requireUser } from "@/lib/session";
import { signUpSchema, signInSchema } from "@/lib/validations";
import { type ActionState, DUPLICATE_EMAIL, INVALID_CREDENTIALS } from "@/lib/errors";

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, fieldErrors: { email: [DUPLICATE_EMAIL] } };
  }

  const hashed = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({ data: { name, email, password: hashed } });
  } catch (error) {
    // P2002 fires when two requests register the same email at once; treat it
    // like the pre-check so the user sees the same friendly message.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, fieldErrors: { email: [DUPLICATE_EMAIL] } };
    }
    throw error;
  }

  // signIn throws a redirect on success, so it stays outside the try/catch above.
  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  return { ok: true };
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
    await signIn("credentials", { ...parsed.data, redirectTo: safeRedirectTo(formData.get("from")) });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, message: INVALID_CREDENTIALS };
    }
    throw error; // redirects and unknown failures bubble up
  }
}

export async function logoutAction() {
  await requireUser();
  await signOut({ redirectTo: "/login" });
}

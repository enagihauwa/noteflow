import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Returns the signed-in user, or sends the visitor to the login page. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user as { id: string; name?: string | null; email?: string | null };
}

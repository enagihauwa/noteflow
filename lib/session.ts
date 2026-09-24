import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isNextRedirect, serverLogError } from "@/lib/log";

// Returns the signed-in user or redirects to the login page.
// Every dashboard query is scoped by the returned user's id.
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  try {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) redirect("/login");
    return user;
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    serverLogError(`session.requireUser user=${session.user.id}`, error);
    throw error;
  }
}
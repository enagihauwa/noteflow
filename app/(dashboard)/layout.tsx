import { requireUser } from "@/lib/session";
import { Navbar } from "@/components/Navbar";

// Server-side guard for every page in this group — AUTH-005
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-dvh">
      <Navbar userName={user.name ?? "there"} />
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}

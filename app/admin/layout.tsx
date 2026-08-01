import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminSidebar from "@/components/AdminSidebar";

export const dynamic = "force-dynamic";

function isAdminRole(role?: string) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email || !isAdminRole(session.user.role)) {
    redirect("/portal-admin/login");
  }

  return (
    <div className="min-h-screen bg-[#060b1a] flex">
      <AdminSidebar
        userName={session.user.name}
        userEmail={session.user.email}
        userRole={session.user.role}
      />

      <main className="flex-1 min-h-screen overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-[#060b1a]/80 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center gap-2 lg:hidden pl-12">
            <span className="text-white font-semibold text-sm">Admin Panel</span>
          </div>
          <div className="hidden lg:block">
            <p className="text-slate-500 text-sm">
              Signed in as{" "}
              <span className="text-white font-medium">
                {session.user.name ?? session.user.email}
              </span>
            </p>
          </div>
          <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-[#456be5]/10 text-[#456be5] border border-[#456be5]/20 font-medium">
            {session.user.role}
          </span>
        </div>

        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

import { checkSuperAdmin } from "@/lib/actions/adminUser";
import AdminUserForm from "@/components/AdminUserForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AddAdminPage() {
  await checkSuperAdmin();

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/sub-admins"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Add Sub-Admin</h1>
          <p className="text-slate-400">Create a new admin account and configure their dashboard access.</p>
        </div>
      </div>

      <div className="bg-[#0b1120] border border-white/10 rounded-2xl p-6 shadow-xl">
        <AdminUserForm />
      </div>
    </div>
  );
}

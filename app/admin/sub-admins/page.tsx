import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, ShieldAlert, Edit, Trash2 } from "lucide-react";
import { checkSuperAdmin } from "@/lib/actions/adminUser";
import DeleteAdminButton from "./DeleteAdminButton";

export const dynamic = "force-dynamic";

export default async function SubAdminsPage() {
  await checkSuperAdmin();

  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Sub-Admins</h1>
          <p className="text-slate-400">Manage admin accounts and their dashboard permissions.</p>
        </div>
        <Link
          href="/admin/sub-admins/add"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#456be5] hover:bg-[#3659c8] text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#456be5]/20"
        >
          <Plus size={20} />
          Add Sub-Admin
        </Link>
      </div>

      <div className="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Access Permissions</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {admins.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    <ShieldAlert size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium text-white mb-1">No Sub-Admins Yet</p>
                    <p className="text-sm">Add your first sub-admin to delegate tasks.</p>
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#456be5] to-[#7c3aed] flex items-center justify-center text-white font-bold shrink-0">
                          {admin.name[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{admin.name}</p>
                          <p className="text-xs text-slate-400">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {admin.permissions.length === 0 ? (
                        <span className="text-xs text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full border border-red-400/20">No Access</span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 max-w-md">
                          {admin.permissions.map(perm => (
                            <span key={perm} className="text-[10px] font-mono text-[#456be5] bg-[#456be5]/10 px-2 py-0.5 rounded border border-[#456be5]/20 uppercase">
                              {perm}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/sub-admins/edit/${admin.id}`}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteAdminButton id={admin.id} name={admin.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getDevelopers } from "@/lib/actions/developer";
import DeleteDeveloperButton from "@/components/DeleteDeveloperButton";
import { Plus, Code2 } from "lucide-react";

export default async function AdminDevelopersPage() {
  const developers = await getDevelopers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Developers</h1>
          <p className="text-slate-400 text-sm mt-1">{developers.length} entries</p>
        </div>
        <Link
          href="/admin/developers/add"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Developer
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Photo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {developers.map((dev) => (
                <tr key={dev.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 border border-white/20">
                      <Image src={dev.image} alt={dev.name} width={48} height={48} className="object-cover w-full h-full" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{dev.name}</td>
                  <td className="px-6 py-4 text-slate-300">{dev.role}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm max-w-[200px] truncate">{dev.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/developers/edit/${dev.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium">
                        Edit
                      </Link>
                      <DeleteDeveloperButton id={dev.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {developers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                    No developers found. Add your first developer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
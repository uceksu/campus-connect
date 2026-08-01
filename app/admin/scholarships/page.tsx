import Link from "next/link";
import { getScholarships } from "@/lib/actions/scholarship";
import DeleteScholarshipButton from "@/components/DeleteScholarshipButton";
import { Plus, GraduationCap, Calendar, ExternalLink } from "lucide-react";

export default async function AdminScholarshipsPage() {
  const scholarships = await getScholarships();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Scholarships</h1>
          <p className="text-slate-400 text-sm mt-1">{scholarships.length} entries</p>
        </div>
        <Link
          href="/admin/scholarships/add"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Scholarship
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Apply Link</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                        <GraduationCap size={16} className="text-cyan-400" />
                      </div>
                      <span className="text-white font-medium text-sm max-w-[220px] truncate">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm max-w-[200px] truncate">{s.provider}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                      {s.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#456be5]" /> {s.deadline}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a href={s.applyLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#456be5] hover:text-[#818cf8] text-sm transition-colors">
                      Apply <ExternalLink size={12} />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/scholarships/edit/${s.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium">
                        Edit
                      </Link>
                      <DeleteScholarshipButton id={s.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {scholarships.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    No scholarships found. Add your first scholarship listing.
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
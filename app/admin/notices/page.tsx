import Link from "next/link";
import { getNotices } from "@/lib/actions/notice";
import DeleteNoticeButton from "@/components/DeleteNoticeButton";
import { Plus, Bell, Calendar, Sparkles } from "lucide-react";

export default async function AdminNoticesPage() {
  const notices = await getNotices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notices</h1>
          <p className="text-slate-400 text-sm mt-1">{notices.length} entries</p>
        </div>
        <Link
          href="/admin/notices/add"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Notice
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Published Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((n) => (
                <tr key={n.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                        <Bell size={16} className="text-orange-400" />
                      </div>
                      <span className="text-white font-medium text-sm max-w-[320px] truncate">{n.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-500/10 text-slate-400 border border-white/5">
                      {n.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {n.isImportant ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                        <Sparkles size={10} /> Important
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs font-medium">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#456be5]" />{" "}
                      {new Date(n.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/notices/edit/${n.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteNoticeButton id={n.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {notices.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                    No notices found. Create your first notice board listing.
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
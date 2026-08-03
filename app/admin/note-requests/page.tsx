import { getNoteRequests, resolveNoteRequest } from "@/lib/actions/noteRequest";
import { revalidatePath } from "next/cache";
import { CheckCircle2, Clock, Inbox, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function NoteRequestsPage() {
  const requests = await getNoteRequests();

  const resolveRequest = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    await resolveNoteRequest(id);
    revalidatePath("/admin/note-requests");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Inbox className="size-6 text-[#456be5]" /> Note Requests
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Study materials requested by students ({requests.filter(r => r.status === "PENDING").length} pending)
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => (
          <div key={req.id} className={`rounded-2xl border p-5 transition-all ${
            req.status === "RESOLVED" 
              ? "bg-emerald-500/5 border-emerald-500/10 opacity-75"
              : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
          }`}>
            <div className="flex justify-between items-start mb-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                req.status === "RESOLVED"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}>
                {req.status === "RESOLVED" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                {req.status}
              </span>
              <span className="text-xs text-slate-500">{formatDistanceToNow(new Date(req.createdAt))} ago</span>
            </div>
            
            <h3 className="font-bold text-white text-lg leading-tight mb-1">{req.subject}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
              <span className="bg-white/5 px-2 py-0.5 rounded">{req.branch}</span>
              <span className="bg-white/5 px-2 py-0.5 rounded">Semester {req.semester[0]}</span>
            </div>

            {req.message && (
              <p className="text-sm text-slate-300 italic bg-black/20 p-3 rounded-xl mb-4 border border-white/5">"{req.message}"</p>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <span className="text-xs font-medium text-slate-400">By {req.studentName}</span>
              
              {req.status === "PENDING" && (
                <form action={resolveRequest}>
                  <input type="hidden" name="id" value={req.id} />
                  <button type="submit" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                    <CheckCircle2 size={14} /> Mark Resolved
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <FileText className="size-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-300">No requests yet</h3>
            <p className="text-slate-500 text-sm mt-1">When students request notes, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

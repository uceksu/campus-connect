import Link from "next/link";
import Image from "next/image";
import { getAcademicNotes } from "@/lib/actions/academicNote";
import DeleteAcademicNoteButton from "@/components/DeleteAcademicNoteButton";
import { Plus, BookOpen, ExternalLink } from "lucide-react";

export default async function AdminAcademicNotesPage() {
  const notes = await getAcademicNotes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Academic Notes</h1>
          <p className="text-slate-400 text-sm mt-1">{notes.length} entries</p>
        </div>
        <Link
          href="/admin/academic-notes/add"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Note
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Module</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Uploaded By</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">File</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                        <BookOpen size={16} className="text-violet-400" />
                      </div>
                      <span className="text-white font-medium text-sm max-w-[180px] truncate">{note.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{note.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      note.type === "Question Paper"
                        ? "bg-red-500/10 border-red-500/20 text-red-400"
                        : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    }`}>
                      {note.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {note.type === "Note" ? note.module : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                      {note.branch}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                      {note.semester} Sem
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{note.uploadedBy}</td>
                  <td className="px-6 py-4">
                    <a href={note.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#456be5] hover:text-[#818cf8] text-sm transition-colors">
                      View <ExternalLink size={12} />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/academic-notes/edit/${note.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium">
                        Edit
                      </Link>
                      <DeleteAcademicNoteButton id={note.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {notes.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center text-slate-500">
                    No academic notes found. Add your first note.
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

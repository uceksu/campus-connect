"use client";

import { useState } from "react";
import { createNoteRequest } from "@/lib/actions/noteRequest";
import { Loader2, X, Send } from "lucide-react";

type Props = {
  activeBranch: string;
  activeSemester: string;
  activeSubject: string | null;
};

export default function NoteRequestModal({ activeBranch, activeSemester, activeSubject }: Props) {
  if (!activeSubject) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");
  const [studentName, setStudentName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    try {
      await createNoteRequest({
        subject: activeSubject,
        semester: activeSemester,
        branch: activeBranch,
        studentName,
        message,
      });
      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        setStudentName("");
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        Missing something? Request Notes
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-white mb-2">Request Study Material</h2>
            <p className="text-sm text-slate-400 mb-6">
              Requesting notes for <strong className="text-white">{activeSubject}</strong> ({activeBranch} / Semester {activeSemester[0]})
            </p>

            {status === "success" ? (
              <div className="py-8 text-center text-emerald-400">
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 mb-3">
                  <CheckCircle2 size={24} />
                </div>
                <p className="font-bold">Request Sent!</p>
                <p className="text-sm text-emerald-500/80 mt-1">Admins will review and upload it soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Rahul M"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Message (Optional)</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Please upload Module 3 handwritten notes..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "saving" || !studentName.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white font-bold transition-all disabled:opacity-50"
                >
                  {status === "saving" ? <Loader2 className="animate-spin size-5" /> : <Send size={18} />}
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Ensure CheckCircle2 is imported!
import { CheckCircle2 } from "lucide-react";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAcademicNote, updateAcademicNote } from "@/lib/actions/academicNote";
import type { AcademicNote, AcademicSubject } from "@/src/generated/prisma/client";
import { Loader2, Save } from "lucide-react";

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const BRANCH_DETAILS = [
  { code: "ECE", name: "Electronics & Communication Engineering" },
  { code: "AD", name: "Artificial Intelligence & Data Science" },
  { code: "CS", name: "Computer Science & Engineering" },
  { code: "CY", name: "Cyber Security" },
  { code: "Polymer", name: "Polymer Technology" },
  { code: "EEE", name: "Electrical & Electronics Engineering" },
  { code: "General", name: "General" }
];

type Props = {
  submitLabel: string;
  noteId?: string;
  initialData?: Partial<AcademicNote>;
  subjects?: AcademicSubject[];
};

export default function AcademicNoteForm({ submitLabel, noteId, initialData, subjects = [] }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    title: initialData?.title ?? "",
    subject: initialData?.subject ?? "",
    semester: initialData?.semester ?? "",
    branch: initialData?.branch ?? "",
    scheme: initialData?.scheme ?? "2019",
    type: initialData?.type ?? "Note",
    module: initialData?.module ?? "Module 1",
    description: initialData?.description ?? "",
    fileUrl: initialData?.fileUrl ?? "",
    uploadedBy: initialData?.uploadedBy ?? "",
  });
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setStatus("saving");
      if (noteId) {
        await updateAcademicNote(noteId, values);
      } else {
        await createAcademicNote(values);
      }
      router.push("/admin/academic-notes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Title *</label>
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="e.g. Data Structures Notes — Unit 3"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Scheme *</label>
            <select
              name="scheme"
              value={values.scheme}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="2019">2019 Scheme</option>
              <option value="2024">2024 Scheme</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Subject *</label>
            <select
              name="subject"
              value={values.subject}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="">Select a Subject</option>
              {subjects
                .filter((s) => s.branch === values.branch && s.semester === values.semester && s.scheme === values.scheme)
                .map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Branch *</label>
            <select
              name="branch"
              value={values.branch}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="">Select Branch</option>
              {BRANCH_DETAILS.map((b) => (
                <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Type *</label>
            <select
              name="type"
              value={values.type}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="Note">Note</option>
              <option value="Question Paper">Question Paper</option>
            </select>
          </div>

          {values.type === "Note" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Module *</label>
              <select
                name="module"
                value={values.module}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
              >
                <option value="Module 1">Module 1</option>
                <option value="Module 2">Module 2</option>
                <option value="Module 3">Module 3</option>
                <option value="Module 4">Module 4</option>
                {values.scheme === "2019" && <option value="Module 5">Module 5</option>}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Semester *</label>
            <select
              name="semester"
              value={values.semester}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="">Select Semester</option>
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>{s} Semester</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Uploaded By *</label>
            <input
              name="uploadedBy"
              value={values.uploadedBy}
              onChange={handleChange}
              placeholder="Prof. Name or Student"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">File URL (PDF / Drive Link) *</label>
            <input
              name="fileUrl"
              type="url"
              value={values.fileUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Brief description of these notes..."
              rows={4}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/academic-notes")}
          className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status !== "idle"}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] disabled:opacity-60 text-white text-sm font-semibold transition-all"
        >
          {status !== "idle" ? (
            <><Loader2 size={16} className="animate-spin" />Saving...</>
          ) : (
            <><Save size={16} />{submitLabel}</>
          )}
        </button>
      </div>
    </form>
  );
}

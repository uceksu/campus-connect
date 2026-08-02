"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAcademicSubject, updateAcademicSubject } from "@/lib/actions/academicSubject";
import { Loader2, Save } from "lucide-react";
import type { AcademicSubject } from "@/src/generated/prisma/client";

type Props = {
  submitLabel: string;
  subjectId?: string;
  initialData?: Partial<AcademicSubject>;
};

export default function SubjectForm({ submitLabel, subjectId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    branch: initialData?.branch ?? "ECE",
    semester: initialData?.semester ?? "1st",
  });
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setStatus("saving");
      if (subjectId) {
        await updateAcademicSubject(subjectId, values);
      } else {
        await createAcademicSubject(values);
      }
      router.push("/admin/subjects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Subject Name *</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. Linear Algebra & Calculus"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Branch Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Branch *</label>
            <select
              name="branch"
              value={values.branch}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="ECE">ECE</option>
              <option value="AD">AD</option>
              <option value="CS">CS</option>
              <option value="CY">CY</option>
              <option value="Polymer">Polymer</option>
              <option value="EEE">EEE</option>
            </select>
          </div>

          {/* Semester Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Semester *</label>
            <select
              name="semester"
              value={values.semester}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
            </select>
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
          onClick={() => router.push("/admin/subjects")}
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

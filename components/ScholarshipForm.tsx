"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createScholarship, updateScholarship } from "@/lib/actions/scholarship";
import type { Scholarship } from "@/src/generated/prisma/client";
import { Loader2, Save } from "lucide-react";

type Props = {
  submitLabel: string;
  scholarshipId?: string;
  initialData?: Partial<Scholarship>;
};

export default function ScholarshipForm({ submitLabel, scholarshipId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    provider: initialData?.provider ?? "",
    amount: initialData?.amount ?? "",
    deadline: initialData?.deadline ?? "",
    eligibility: initialData?.eligibility ?? "",
    description: initialData?.description ?? "",
    applyLink: initialData?.applyLink ?? "",
  });
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setStatus("saving");
      if (scholarshipId) {
        await updateScholarship(scholarshipId, values);
      } else {
        await createScholarship(values);
      }
      router.push("/admin/scholarships");
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
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Scholarship Name *</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. MCM Scholarship 2026"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Provider */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Provider *</label>
            <input
              name="provider"
              value={values.provider}
              onChange={handleChange}
              placeholder="e.g. State Government / Corporate Sponsor"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Amount *</label>
            <input
              name="amount"
              value={values.amount}
              onChange={handleChange}
              placeholder="e.g. Rs. 50,000 / Year"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Application Deadline *</label>
            <input
              name="deadline"
              value={values.deadline}
              onChange={handleChange}
              placeholder="e.g. 31st October 2026"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Apply Link */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Official Apply Link *</label>
            <input
              name="applyLink"
              type="url"
              value={values.applyLink}
              onChange={handleChange}
              placeholder="https://scholarships.gov.in/..."
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Eligibility */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Eligibility Criteria *</label>
            <textarea
              name="eligibility"
              value={values.eligibility}
              onChange={handleChange}
              placeholder="e.g. Annual family income below 2.5 LPA. CGPA >= 7.5."
              rows={3}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Brief description of the scholarship, guidelines, or requirements."
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
          onClick={() => router.push("/admin/scholarships")}
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

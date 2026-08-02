"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDepartment, updateDepartment } from "@/lib/actions/department";
import { Loader2, Save } from "lucide-react";
import type { Department } from "@/src/generated/prisma/client";

type Props = {
  submitLabel: string;
  departmentId?: string;
  initialData?: Partial<Department>;
};

export default function DepartmentForm({ submitLabel, departmentId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    shortName: initialData?.shortName ?? "",
    description: initialData?.description ?? "",
  });
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setStatus("saving");
      
      if (departmentId) {
        await updateDepartment(departmentId, values);
      } else {
        await createDepartment(values);
      }
      
      router.push("/admin/departments");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        
        {/* Row 1: Name and Short Name */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Department Name *</label>
            <input
              required
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. Computer Science and Engineering"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-[#456be5] focus:outline-none focus:ring-1 focus:ring-[#456be5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Short Name *</label>
            <input
              required
              name="shortName"
              value={values.shortName}
              onChange={handleChange}
              placeholder="e.g. CSE"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-[#456be5] focus:outline-none focus:ring-1 focus:ring-[#456be5]"
            />
          </div>
        </div>

        {/* Row 2: Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
          <textarea
            required
            name="description"
            rows={4}
            value={values.description}
            onChange={handleChange}
            placeholder="A brief overview of the department..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-[#456be5] focus:outline-none focus:ring-1 focus:ring-[#456be5]"
          />
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
          onClick={() => router.push("/admin/departments")}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status !== "idle"}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#456be5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5b7df0] disabled:opacity-50 transition-colors"
        >
          {status !== "idle" ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {status !== "idle" ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

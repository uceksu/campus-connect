"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFaculty, updateFaculty } from "@/lib/actions/faculty";
import { Loader2, Save } from "lucide-react";
import type { Faculty } from "@/src/generated/prisma/client";
import ImageUpload from "@/components/ImageUpload";

type Props = {
  submitLabel: string;
  departmentId: string;
  facultyId?: string;
  initialData?: Partial<Faculty>;
};

export default function FacultyForm({ submitLabel, departmentId, facultyId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    designation: initialData?.designation ?? "",
    specialization: initialData?.specialization ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    isHOD: initialData?.isHOD ?? false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removeInitialImage, setRemoveInitialImage] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch("/api/cloudinary/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Upload failed");
    return data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setStatus("uploading");
      const image = selectedFile 
        ? await uploadImage(selectedFile) 
        : (removeInitialImage ? null : initialData?.image ?? null);
      
      setStatus("saving");
      
      if (facultyId) {
        await updateFaculty(facultyId, { ...values, image, departmentId });
      } else {
        await createFaculty({ ...values, image, departmentId });
      }
      
      router.push(`/admin/departments/${departmentId}/faculty`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
        
        {/* Basic Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Name *</label>
            <input
              required
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. Dr. John Doe"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-[#456be5] focus:outline-none focus:ring-1 focus:ring-[#456be5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Designation *</label>
            <input
              required
              name="designation"
              value={values.designation}
              onChange={handleChange}
              placeholder="e.g. Assistant Professor"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-[#456be5] focus:outline-none focus:ring-1 focus:ring-[#456be5]"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Specialization (Optional)</label>
            <input
              name="specialization"
              value={values.specialization}
              onChange={handleChange}
              placeholder="e.g. Computer Science & Engineering"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-[#456be5] focus:outline-none focus:ring-1 focus:ring-[#456be5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email (Optional)</label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="e.g. jdoe@college.edu"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-[#456be5] focus:outline-none focus:ring-1 focus:ring-[#456be5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Mobile Number (Optional)</label>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-[#456be5] focus:outline-none focus:ring-1 focus:ring-[#456be5]"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer select-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              name="isHOD"
              checked={values.isHOD}
              onChange={handleChange}
              className="w-5 h-5 rounded border-white/20 bg-black/20 text-[#456be5] focus:ring-[#456be5] focus:ring-offset-0"
            />
            <div>
              <p className="text-sm font-semibold text-white">Mark as HOD</p>
              <p className="text-xs text-slate-400 mt-0.5">This person is the Head of Department. Checking this will uncheck any existing HOD.</p>
            </div>
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Profile Photo (Optional)</label>
          <ImageUpload 
            initialImageUrl={initialData?.image && !removeInitialImage ? initialData.image : undefined}
            onFileSelect={setSelectedFile}
            onImageRemove={() => setRemoveInitialImage(true)}
            cropShape="rect"
            aspect={1}
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
          onClick={() => router.push(`/admin/departments/${departmentId}/faculty`)}
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
          {status === "uploading" ? "Uploading image..." : status === "saving" ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

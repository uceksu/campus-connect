"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNotice, updateNotice } from "@/lib/actions/notice";
import type { Notice } from "@/src/generated/prisma/client";
import { Loader2, Save } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

type Props = {
  submitLabel: string;
  noticeId?: string;
  initialData?: Partial<Notice>;
};

export default function NoticeForm({ submitLabel, noticeId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
    category: initialData?.category ?? "General",
    isImportant: initialData?.isImportant ?? false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removeInitialImage, setRemoveInitialImage] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
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
      if (noticeId) {
        await updateNotice(noticeId, { ...values, image });
      } else {
        await createNotice({ ...values, image });
      }
      router.push("/admin/notices");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Title */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Notice Title *</label>
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="e.g. Schedule for Second Internal Examination"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Category *</label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="General">General</option>
              <option value="Academics">Academics</option>
              <option value="Exams">Exams</option>
              <option value="Admissions">Admissions</option>
              <option value="Events">Events</option>
            </select>
          </div>

          {/* Is Important Checkbox */}
          <div className="flex items-center gap-3 pt-6 sm:pt-9">
            <input
              type="checkbox"
              name="isImportant"
              id="isImportant"
              checked={values.isImportant}
              onChange={handleChange}
              className="size-5 rounded border-white/10 bg-white/5 text-[#456be5] focus:ring-0"
            />
            <label htmlFor="isImportant" className="text-sm font-medium text-slate-300 cursor-pointer">
              Mark as Important Notice (Highlights list card)
            </label>
          </div>

          {/* Content */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Notice Content *</label>
            <textarea
              name="content"
              value={values.content}
              onChange={handleChange}
              placeholder="Enter details of the notice..."
              rows={6}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
            />
          </div>

          {/* Image */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Notice Image (Optional)</label>
            <ImageUpload 
              initialImageUrl={initialData?.image && !removeInitialImage ? initialData.image : undefined}
              onFileSelect={setSelectedFile}
              onImageRemove={() => setRemoveInitialImage(true)}
              disableCropping={true}
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
          onClick={() => router.push("/admin/notices")}
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

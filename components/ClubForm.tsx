"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { createClub, updateClub } from "@/lib/actions/club";
import type { Club } from "@/src/generated/prisma/client";
import { Loader2, Save } from "lucide-react";

const CATEGORIES = ["Academic", "Cultural", "Sports", "Technical", "Social", "Other"];

type Props = {
  submitLabel: string;
  clubId?: string;
  initialData?: Partial<Club>;
};

export default function ClubForm({ submitLabel, clubId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    category: initialData?.category ?? "",
    description: initialData?.description ?? "",
    contactEmail: initialData?.contactEmail ?? "",
    contactPhone: initialData?.contactPhone ?? "",
    meetingSchedule: initialData?.meetingSchedule ?? "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    if (!selectedFile && !initialData?.image) {
      setError("Please upload a club image.");
      return;
    }
    try {
      setStatus("uploading");
      const imageUrl = selectedFile ? await uploadImage(selectedFile) : initialData!.image!;
      setStatus("saving");
      if (clubId) {
        await updateClub(clubId, { ...values, imageUrl });
      } else {
        await createClub({ ...values, imageUrl });
      }
      router.push("/admin/clubs");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Club Name *</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. IEEE Student Branch"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Category *</label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Contact Email *</label>
            <input
              name="contactEmail"
              type="email"
              value={values.contactEmail}
              onChange={handleChange}
              placeholder="club@ksuuce.edu"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Contact Phone *</label>
            <input
              name="contactPhone"
              value={values.contactPhone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Meeting Schedule *</label>
            <input
              name="meetingSchedule"
              value={values.meetingSchedule}
              onChange={handleChange}
              placeholder="e.g. Every Saturday 10:00 AM — Room 204"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="What does this club do? Who should join?"
            rows={4}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
          />
        </div>

        <ImageUpload
          label="Club Image / Logo"
          initialImageUrl={initialData?.image}
          required={!initialData?.image}
          onFileSelect={setSelectedFile}
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/clubs")}
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
            <><Loader2 size={16} className="animate-spin" />{status === "uploading" ? "Uploading..." : "Saving..."}</>
          ) : (
            <><Save size={16} />{submitLabel}</>
          )}
        </button>
      </div>
    </form>
  );
}

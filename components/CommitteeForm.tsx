"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { createCommitteeMember, updateCommitteeMember } from "@/lib/actions/committee";
import { Loader2, Save } from "lucide-react";
import type { CommitteeMember } from "@/src/generated/prisma/client";

export type CommitteeFormValues = {
  name: string;
  role: string;
  organization: string;
  whatsapp: string;
  instagram: string;
};

type CommitteeFormProps = {
  submitLabel: string;
  initialData?: Partial<CommitteeMember>;
  memberId?: string;
};

export default function CommitteeForm({ submitLabel, initialData, memberId }: CommitteeFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<CommitteeFormValues>({
    name: initialData?.name ?? "",
    role: initialData?.role ?? "President",
    organization: initialData?.organization ?? "KSU",
    whatsapp: initialData?.whatsapp ?? "",
    instagram: initialData?.instagram ?? "",
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
      setError("Please upload an image.");
      return;
    }
    try {
      setStatus("uploading");
      const imageUrl = selectedFile ? await uploadImage(selectedFile) : initialData!.image!;
      setStatus("saving");
      if (memberId) {
        await updateCommitteeMember(memberId, { ...values, imageUrl });
      } else {
        await createCommitteeMember({ ...values, imageUrl });
      }
      router.push("/admin/committee");
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
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name *</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Role *</label>
            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Secretary">Secretary</option>
              <option value="Joint Secretary">Joint Secretary</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Executive Member">Executive Member</option>
            </select>
          </div>

          {/* Organization Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Organization *</label>
            <select
              name="organization"
              value={values.organization}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="KSU">KSU</option>
              <option value="Priyadarshini">Priyadarshini</option>
            </select>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">WhatsApp Number *</label>
            <input
              name="whatsapp"
              value={values.whatsapp}
              onChange={handleChange}
              placeholder="e.g. 919876543210 (include country code without +)"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Instagram */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Instagram Profile Link *</label>
            <input
              name="instagram"
              value={values.instagram}
              onChange={handleChange}
              placeholder="e.g. https://instagram.com/username"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>
        </div>

        <ImageUpload
          label="Profile Photo"
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
          onClick={() => router.push("/admin/committee")}
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
            <>
              <Loader2 size={16} className="animate-spin" />
              {status === "uploading" ? "Uploading..." : "Saving..."}
            </>
          ) : (
            <>
              <Save size={16} />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

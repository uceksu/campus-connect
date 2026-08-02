"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDeveloper, updateDeveloper } from "@/lib/actions/developer";
import type { Developer } from "@/src/generated/prisma/client";
import { Loader2, Save } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

type Props = {
  submitLabel: string;
  developerId?: string;
  initialData?: Partial<Developer>;
};

export default function DeveloperForm({ submitLabel, developerId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    role: initialData?.role ?? "",
    whatsapp: initialData?.whatsapp ?? "",
    instagram: initialData?.instagram ?? "",
    description: initialData?.description ?? "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removeInitialImage, setRemoveInitialImage] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (!selectedFile && (!initialData?.image || removeInitialImage)) {
      setError("Please upload an image.");
      return;
    }
    setError(null);
    try {
      setStatus("uploading");
      const image = selectedFile 
        ? await uploadImage(selectedFile) 
        : (removeInitialImage ? null : initialData?.image ?? null);
      
      setStatus("saving");
      
      if (developerId) {
        await updateDeveloper(developerId, { ...values, image: image as string });
      } else {
        await createDeveloper({ ...values, image: image as string });
      }
      router.push("/admin/developers");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        {/* Image Upload */}
        <div className="sm:col-span-2">
          <ImageUpload 
            label="Photo *" 
            initialImageUrl={initialData?.image && !removeInitialImage ? initialData.image : undefined}
            onFileSelect={setSelectedFile}
            onImageRemove={() => setRemoveInitialImage(true)}
            cropShape="round"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Name *</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Role *</label>
            <input
              name="role"
              value={values.role}
              onChange={handleChange}
              placeholder="e.g. Lead Developer"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">WhatsApp Number</label>
            <input
              name="whatsapp"
              value={values.whatsapp}
              onChange={handleChange}
              placeholder="e.g. 919876543210"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Instagram Link</label>
            <input
              name="instagram"
              value={values.instagram}
              onChange={handleChange}
              placeholder="e.g. https://instagram.com/..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Brief description about the developer..."
              rows={3}
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
          onClick={() => router.push("/admin/developers")}
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
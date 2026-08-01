"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { createHospital, updateHospital } from "@/lib/actions/hospital";
import type { Hospital } from "@/src/generated/prisma/client";
import { Loader2, Save } from "lucide-react";

type Props = {
  submitLabel: string;
  hospitalId?: string;
  initialData?: Partial<Hospital>;
};

export default function HospitalForm({ submitLabel, hospitalId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    address: initialData?.address ?? "",
    phone: initialData?.phone ?? "",
    emergencyContact: initialData?.emergencyContact ?? "",
    maps: initialData?.maps ?? "",
    description: initialData?.description ?? "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (hospitalId) {
        await updateHospital(hospitalId, { ...values, imageUrl });
      } else {
        await createHospital({ ...values, imageUrl });
      }
      router.push("/admin/hospitals");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { name: "name", label: "Hospital Name", placeholder: "e.g. City General Hospital" },
            { name: "address", label: "Address", placeholder: "Full address" },
            { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210" },
            { name: "emergencyContact", label: "Emergency Contact", placeholder: "Emergency hotline" },
            { name: "maps", label: "Google Maps Link", placeholder: "https://maps.google.com/..." },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{field.label} *</label>
              <input
                name={field.name}
                value={(values as Record<string, string>)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="About the hospital..."
            rows={4}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
          />
        </div>
        <ImageUpload
          label="Hospital Image"
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
        <button type="button" onClick={() => router.push("/admin/hospitals")} className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors text-sm font-medium">
          Cancel
        </button>
        <button type="submit" disabled={status !== "idle"} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] disabled:opacity-60 text-white text-sm font-semibold transition-all">
          {status !== "idle" ? <><Loader2 size={16} className="animate-spin" /> {status === "uploading" ? "Uploading..." : "Saving..."}</> : <><Save size={16} /> {submitLabel}</>}
        </button>
      </div>
    </form>
  );
}

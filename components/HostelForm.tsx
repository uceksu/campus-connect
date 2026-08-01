"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { createHostel, updateHostel } from "@/lib/actions/hostel";
import { Loader2, Save } from "lucide-react";

export type HostelFormValues = {
  name: string;
  type: string;
  distance: string;
  rating: string;
  price: string;
  phone: string;
  maps: string;
  description: string;
};

type HostelFormProps = {
  submitLabel: string;
  initialData?: Partial<HostelFormValues> & { image?: string; type?: string };
  hostelId?: string;
};

const textFields = [
  { name: "name", label: "Hostel Name", placeholder: "e.g. Sri Balaji Hostel" },
  { name: "distance", label: "Distance from Campus", placeholder: "e.g. 500m" },
  { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210" },
  { name: "price", label: "Price Range", placeholder: "e.g. ₹3,000 - ₹5,000/mo" },
  { name: "rating", label: "Rating (0–5)", placeholder: "4.2", type: "number" },
  { name: "maps", label: "Google Maps Link", placeholder: "https://maps.google.com/..." },
];

export default function HostelForm({ submitLabel, initialData, hostelId }: HostelFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<HostelFormValues>({
    name: initialData?.name ?? "",
    type: initialData?.type ?? "Boys",
    distance: initialData?.distance ?? "",
    rating: initialData?.rating ?? "",
    price: initialData?.price ?? "",
    phone: initialData?.phone ?? "",
    maps: initialData?.maps ?? "",
    description: initialData?.description ?? "",
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
      if (hostelId) {
        await updateHostel(hostelId, { ...values, imageUrl });
      } else {
        await createHostel({ ...values, imageUrl });
      }
      router.push("/admin/hostels");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {textFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {field.label} *
              </label>
              <input
                name={field.name}
                type={field.type ?? "text"}
                value={(values as Record<string, string>)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                min={field.type === "number" ? "0" : undefined}
                max={field.type === "number" ? "5" : undefined}
                step={field.type === "number" ? "0.1" : undefined}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
              />
            </div>
          ))}
          {/* Hostel Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Hostel Type *
            </label>
            <select
              name="type"
              value={values.type}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="Boys">Boys' Hostel</option>
              <option value="Girls">Girls' Hostel</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="About this hostel..."
            rows={4}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
          />
        </div>

        <ImageUpload
          label="Hostel Image"
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
          onClick={() => router.push("/admin/hostels")}
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

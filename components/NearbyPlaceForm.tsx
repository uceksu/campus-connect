"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { createNearbyPlace, updateNearbyPlace } from "@/lib/actions/nearbyPlace";
import type { NearbyPlace } from "@/src/generated/prisma/client";
import { Loader2, Save } from "lucide-react";

const CATEGORIES = [
  "Restaurant",
  "Cafe",
  "Pharmacy",
  "Supermarket",
  "Gym",
  "Salon",
  "Laundry",
  "Bank / ATM",
  "Stationery",
  "Transport",
  "Entertainment",
  "Other",
];

type Props = {
  submitLabel: string;
  placeId?: string;
  initialData?: Partial<NearbyPlace>;
};

export default function NearbyPlaceForm({ submitLabel, placeId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    category: initialData?.category ?? "",
    address: initialData?.address ?? "",
    phone: initialData?.phone ?? "",
    maps: initialData?.maps ?? "",
    rating: initialData?.rating?.toString() ?? "",
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
      if (placeId) {
        await updateNearbyPlace(placeId, { ...values, imageUrl });
      } else {
        await createNearbyPlace({ ...values, imageUrl });
      }
      router.push("/admin/nearby-places");
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
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Place Name *</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. Reliance Fresh"
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
              className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Address *</label>
            <input
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Near campus gate..."
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number *</label>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Rating (0–5) *</label>
            <input
              name="rating"
              type="number"
              value={values.rating}
              onChange={handleChange}
              placeholder="4.2"
              min="0"
              max="5"
              step="0.1"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>

          {/* Maps */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Google Maps Link *</label>
            <input
              name="maps"
              value={values.maps}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="About this place..."
            rows={4}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
          />
        </div>

        <ImageUpload
          label="Place Image"
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
          onClick={() => router.push("/admin/nearby-places")}
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { createRestaurant, updateRestaurant } from "@/lib/actions/restaurant";
import type { Restaurant } from "@/src/generated/prisma/client";
import { Loader2, Save } from "lucide-react";

type Props = {
  submitLabel: string;
  restaurantId?: string;
  initialData?: Partial<Restaurant>;
};

export default function RestaurantForm({ submitLabel, restaurantId, initialData }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initialData?.name ?? "",
    address: initialData?.address ?? "",
    phone: initialData?.phone ?? "",
    maps: initialData?.maps ?? "",
    rating: initialData?.rating?.toString() ?? "",
    price: initialData?.price ?? "",
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
      if (restaurantId) {
        await updateRestaurant(restaurantId, { ...values, imageUrl });
      } else {
        await createRestaurant({ ...values, imageUrl });
      }
      router.push("/admin/restaurants");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  const textFields = [
    { name: "name", label: "Restaurant Name", placeholder: "e.g. Campus Diner" },
    { name: "address", label: "Address", placeholder: "Near campus gate..." },
    { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210" },
    { name: "price", label: "Price Range", placeholder: "e.g. ₹50 - ₹200" },
    { name: "rating", label: "Rating (0–5)", placeholder: "4.2", type: "number" },
    { name: "maps", label: "Google Maps Link", placeholder: "https://maps.google.com/..." },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {textFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{field.label} *</label>
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
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Description *</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="About this restaurant..."
            rows={4}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] transition-all resize-none"
          />
        </div>
        <ImageUpload
          label="Restaurant Image"
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
        <button type="button" onClick={() => router.push("/admin/restaurants")} className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors text-sm font-medium">
          Cancel
        </button>
        <button type="submit" disabled={status !== "idle"} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] disabled:opacity-60 text-white text-sm font-semibold transition-all">
          {status !== "idle" ? <><Loader2 size={16} className="animate-spin" /> {status === "uploading" ? "Uploading..." : "Saving..."}</> : <><Save size={16} /> {submitLabel}</>}
        </button>
      </div>
    </form>
  );
}

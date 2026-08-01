"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { Loader2, Save } from "lucide-react";

export type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "url" | "textarea" | "select" | "checkbox";
  options?: { value: string; label: string }[];
  required?: boolean;
  colSpan?: 1 | 2;
};

type AdminFormProps = {
  title: string;
  fields: FieldConfig[];
  initialValues?: Record<string, string | boolean>;
  initialImageUrl?: string;
  hasImage?: boolean;
  imageLabel?: string;
  onSubmit: (values: Record<string, string | boolean>, imageUrl?: string) => Promise<void>;
  backHref: string;
  submitLabel?: string;
};

export default function AdminForm({
  title,
  fields,
  initialValues = {},
  initialImageUrl,
  hasImage = true,
  imageLabel = "Upload image",
  onSubmit,
  backHref,
  submitLabel = "Save",
}: AdminFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string | boolean>>(() => {
    const defaults: Record<string, string | boolean> = {};
    for (const field of fields) {
      defaults[field.name] = initialValues[field.name] ?? (field.type === "checkbox" ? false : "");
    }
    return defaults;
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    setStatus("uploading");
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/cloudinary/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Image upload failed.");
    return data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (hasImage && !selectedFile && !initialImageUrl) {
      setError("Please upload an image.");
      return;
    }

    try {
      let imageUrl = initialImageUrl ?? "";
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      setStatus("saving");
      await onSubmit(values, hasImage ? imageUrl : undefined);
      router.push(backHref);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  const handleChange = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.colSpan === 2 || field.type === "textarea" ? "sm:col-span-2" : ""}
              >
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  {field.label}
                  {field.required !== false && <span className="text-red-400 ml-1">*</span>}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={values[field.name] as string}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder ?? field.label}
                    rows={4}
                    required={field.required !== false}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] focus:border-transparent transition-all resize-none"
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={values[field.name] as string}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required !== false}
                    className="w-full rounded-xl border border-white/10 bg-[#0f1628] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] focus:border-transparent transition-all"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      id={field.name}
                      type="checkbox"
                      checked={values[field.name] as boolean}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      className="w-4 h-4 rounded accent-[#456be5]"
                    />
                    <label htmlFor={field.name} className="text-slate-300 text-sm">
                      {field.placeholder ?? field.label}
                    </label>
                  </div>
                ) : (
                  <input
                    name={field.name}
                    type={field.type ?? "text"}
                    value={values[field.name] as string}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder ?? field.label}
                    required={field.required !== false}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5] focus:border-transparent transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          {hasImage && (
            <div className="sm:col-span-2">
              <ImageUpload
                label={imageLabel}
                initialImageUrl={initialImageUrl}
                required={!initialImageUrl}
                onFileSelect={setSelectedFile}
              />
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push(backHref)}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={status !== "idle"}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] disabled:opacity-60 text-white text-sm font-semibold transition-all"
          >
            {status === "uploading" ? (
              <><Loader2 size={16} className="animate-spin" /> Uploading image...</>
            ) : status === "saving" ? (
              <><Loader2 size={16} className="animate-spin" /> Saving...</>
            ) : (
              <><Save size={16} /> {submitLabel}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type ImageUploadProps = {
  label?: string;
  initialImageUrl?: string;
  required?: boolean;
  onFileSelect: (file: File | null) => void;
};

export default function ImageUpload({
  label = "Upload hostel image",
  initialImageUrl,
  required = false,
  onFileSelect,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setPreviewUrl(initialImageUrl ?? null);
  }, [initialImageUrl]);

  const handleFile = (file: File | null) => {
    setError(null);

    if (!file) {
      setPreviewUrl(initialImageUrl ?? null);
      onFileSelect(null);
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, WEBP, or AVIF image.");
      onFileSelect(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Max size is 5MB.");
      onFileSelect(null);
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0] ?? null;
    handleFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required ? " *" : ""}
      </label>

      <div
        className={`border-dashed border-2 rounded-3xl p-6 text-center transition-all ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        }`}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <p className="text-sm text-gray-500 mb-4">
          Drag & drop an image here, or click to choose a file.
        </p>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          onChange={handleChange}
          className="hidden"
          id="hostel-image-upload"
        />

        <label
          htmlFor="hostel-image-upload"
          className="inline-flex cursor-pointer rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Select Image
        </label>

        {previewUrl && (
          <div className="mt-5">
            <img
              src={previewUrl}
              alt="Selected preview"
              className="mx-auto h-48 w-full max-w-md rounded-3xl object-cover"
            />
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}

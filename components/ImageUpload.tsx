"use client";

import { useEffect, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import { X, Crop as CropIcon } from "lucide-react";

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
  aspect?: number;
  preserveAspectRatio?: boolean;
  cropShape?: "rect" | "round";
  onFileSelect: (file: File | null) => void;
};

export default function ImageUpload({
  label = "Upload image",
  initialImageUrl,
  required = false,
  aspect = 1, // Default 1:1 square aspect ratio
  preserveAspectRatio = false,
  cropShape = "rect",
  onFileSelect,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Cropper states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dynamicAspect, setDynamicAspect] = useState(aspect);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    setPreviewUrl(initialImageUrl ?? null);
  }, [initialImageUrl]);

  useEffect(() => {
    setDynamicAspect(aspect);
  }, [aspect]);

  const handleFile = (file: File | null) => {
    setError(null);

    if (!file) {
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, WEBP, or AVIF image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Max size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result?.toString() || null);
      setIsCropping(true);
    });
    reader.readAsDataURL(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) handleFile(file);
    // Reset input value so the same file can be selected again
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0] ?? null;
    if (file) handleFile(file);
  };

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedFile) {
        setPreviewUrl(URL.createObjectURL(croppedFile));
        onFileSelect(croppedFile);
        setIsCropping(false);
        setImageSrc(null);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to crop image.");
    }
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    setImageSrc(null);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onFileSelect(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
        {required ? " *" : ""}
      </label>

      {isCropping && imageSrc ? (
        <div className="relative w-full h-[400px] bg-slate-900 rounded-3xl overflow-hidden mb-4 border border-white/10">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={dynamicAspect}
            cropShape={cropShape}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onMediaLoaded={(mediaSize) => {
              if (preserveAspectRatio) {
                setDynamicAspect(mediaSize.width / mediaSize.height);
              }
            }}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            <button
              type="button"
              onClick={handleCancelCrop}
              className="text-white hover:text-red-400 px-3 py-1 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <div className="w-px h-4 bg-white/20"></div>
            <button
              type="button"
              onClick={handleSaveCrop}
              className="text-[#456be5] hover:text-[#5b7df0] px-3 py-1 text-sm font-bold transition-colors flex items-center gap-1"
            >
              <CropIcon size={16} /> Save Crop
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`border-dashed border-2 rounded-3xl p-6 text-center transition-all ${
            dragActive ? "border-[#456be5] bg-[#456be5]/10" : "border-white/20 bg-white/5"
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
          <p className="text-sm text-slate-400 mb-4">
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
            className="inline-flex cursor-pointer rounded-full bg-[#456be5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5b7df0] transition-colors"
          >
            Select Image
          </label>

          {previewUrl && (
            <div className="mt-6 relative inline-block">
              <img
                src={previewUrl}
                alt="Selected preview"
                className="mx-auto h-48 w-full max-w-md rounded-2xl object-contain bg-black/20"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm font-medium text-red-400 bg-red-500/10 py-2 px-3 rounded-lg inline-block">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

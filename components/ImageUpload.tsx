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
  disableCropping?: boolean;
  cropShape?: "rect" | "round";
  onFileSelect: (file: File | null) => void;
  onImageRemove?: () => void;
};

export default function ImageUpload({
  label = "Upload image",
  initialImageUrl,
  required = false,
  aspect = 1, // Default 1:1 square aspect ratio
  preserveAspectRatio = false,
  disableCropping = false,
  cropShape = "rect",
  onFileSelect,
  onImageRemove,
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

    const isImage =
      file.type.startsWith("image/") ||
      ALLOWED_FILE_TYPES.includes(file.type.toLowerCase()) ||
      /\.(jpg|jpeg|png|webp|avif|gif|ico|svg)$/i.test(file.name);

    if (!isImage) {
      setError("Please upload a JPG, PNG, WEBP, or AVIF image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Max size is 5MB.");
      return;
    }

    if (disableCropping) {
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
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
    if (onImageRemove) onImageRemove();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
        {required ? " *" : ""}
      </label>

      {isCropping && imageSrc ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 px-4 py-2.5">
            <CropIcon size={16} className="text-yellow-400 shrink-0" />
            <p className="text-sm text-yellow-300 font-medium">Adjust the crop area, then click <strong>"Use This Image"</strong> below before saving.</p>
          </div>
          <div className="relative w-full h-[360px] bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
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
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancelCrop}
              className="flex-shrink-0 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveCrop}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#456be5] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#5b7df0] transition-colors shadow-lg shadow-[#456be5]/30"
            >
              <CropIcon size={16} /> Use This Image
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {!previewUrl && (
            <div
              className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 transition-colors ${
                dragActive ? "border-[#456be5] bg-[#456be5]/10" : "border-slate-700 bg-slate-800/50 hover:bg-slate-800"
              }`}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center text-center">
                <CropIcon className="mb-3 size-8 text-slate-400" />
                <p className="text-sm font-medium text-slate-300">
                  Drag & drop an image here, or click to choose a file.
                </p>
                <p className="mt-2 text-xs text-slate-500">Max size 5MB (JPG, PNG, WEBP, AVIF)</p>
                <button
                  type="button"
                  className="mt-4 rounded-full bg-[#456be5] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#456be5]/30 transition-all hover:bg-[#3b5bd9]"
                  onClick={() => document.getElementById("image-upload-input")?.click()}
                >
                  Select Image
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="image-upload-input"
              />
            </div>
          )}

          {previewUrl && (
            <div className="relative inline-block">
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

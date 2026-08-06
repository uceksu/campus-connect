"use client";

import { useState, useTransition } from "react";
import ImageUpload from "@/components/ImageUpload";
import { updateSiteLogo } from "@/lib/actions/settings";
import { Image as ImageIcon, Shield, Check, Loader2, RotateCcw, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoToggle({ initialLogo = "" }: { initialLogo?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initialLogo);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("image", file);
    const res = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to upload image");
    }
    const data = await res.json();
    return data.url;
  };

  const handleSave = async () => {
    setError(null);
    let finalLogoUrl = logoUrl;

    try {
      if (selectedFile) {
        setIsUploading(true);
        finalLogoUrl = await uploadImage(selectedFile);
        setIsUploading(false);
      }

      startTransition(async () => {
        const res = await updateSiteLogo(finalLogoUrl);
        if (res.success) {
          setLogoUrl(finalLogoUrl);
          setSelectedFile(null);
          setSavedMessage(true);
          router.refresh();
          setTimeout(() => setSavedMessage(false), 3000);
        } else {
          setError(res.error || "Failed to save logo.");
        }
      });
    } catch (err: any) {
      setIsUploading(false);
      setError(err?.message || "An error occurred while uploading.");
    }
  };

  const handleSetDefaultShield = () => {
    setSelectedFile(null);
    setLogoUrl("");
  };

  const handleReset = async () => {
    if (!window.confirm("Reset site logo/favicon to default system Shield icon?")) return;
    setError(null);
    startTransition(async () => {
      const res = await updateSiteLogo("");
      if (res.success) {
        setLogoUrl("");
        setSelectedFile(null);
        setSavedMessage(true);
        router.refresh();
        setTimeout(() => setSavedMessage(false), 3000);
      } else {
        setError(res.error || "Failed to reset logo.");
      }
    });
  };

  return (
    <>
      {/* Compact Dashboard Card */}
      <div className="rounded-2xl border border-[#456be5]/20 bg-gradient-to-r from-[#1a2644] to-[#0f1628] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#456be5]/20 text-[#456be5] flex items-center justify-center shrink-0 overflow-hidden border border-[#456be5]/30">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Shield size={24} className="text-[#456be5]" />
            )}
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Website Logo & Favicon</h3>
            <p className="text-slate-400 text-sm mt-0.5 max-w-md">
              Updates the browser tab icon (favicon), Google search logo, PWA app icon & site header.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-[#456be5]/20"
        >
          <Upload size={16} />
          <span>Change Logo</span>
        </button>
      </div>

      {/* Upload Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172a] p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#456be5]/20 text-[#456be5] flex items-center justify-center">
                  <ImageIcon size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-none">Update Site Logo & Icon</h3>
                  <p className="text-slate-400 text-xs mt-1">Applies to browser tab, app icon & share previews</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Current Logo / Upload Area */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Logo & Favicon Preview
                  </span>
                  <button
                    type="button"
                    onClick={handleSetDefaultShield}
                    className="text-xs text-[#456be5] hover:underline font-semibold flex items-center gap-1"
                  >
                    <Shield size={12} /> Use Default Shield Icon
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-[#071333]">
                  <div className="w-9 h-9 rounded-xl bg-[#456be5] flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                    {selectedFile ? (
                      <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-full h-full object-cover" />
                    ) : logoUrl ? (
                      <img src={logoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Shield size={18} className="text-white" />
                    )}
                  </div>
                  <div className="text-xs text-slate-300">
                    <p className="font-bold text-white">Browser Tab Icon Preview</p>
                    <p className="text-slate-400 text-[11px]">
                      {logoUrl || selectedFile ? "Custom Uploaded Logo Active" : "Default Blue Shield Icon Active"}
                    </p>
                  </div>
                </div>
              </div>

              <ImageUpload
                label="Choose Logo File (PNG / WEBP / Square format recommended)"
                initialImageUrl={logoUrl}
                aspect={1}
                cropShape="rect"
                onFileSelect={(file) => {
                  setSelectedFile(file);
                  setError(null);
                }}
                onImageRemove={() => {
                  setSelectedFile(null);
                  setLogoUrl("");
                }}
              />
            </div>

            {savedMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <Check size={16} /> Logo updated successfully across website & browser tab!
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              {logoUrl ? (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isPending || isUploading}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors disabled:opacity-50"
                >
                  <RotateCcw size={14} />
                  <span>Reset Default</span>
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isPending || isUploading || (!selectedFile && logoUrl === initialLogo)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold text-sm transition-colors shadow-lg shadow-[#456be5]/20"
                >
                  {isUploading || isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Logo"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

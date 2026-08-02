"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDeveloper } from "@/lib/actions/developer";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteDeveloperButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this developer?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteDeveloper(id);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete developer.");
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition-all text-sm font-medium"
      title="Delete Developer"
    >
      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      Delete
    </button>
  );
}
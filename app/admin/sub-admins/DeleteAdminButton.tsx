"use client";

import { Trash2 } from "lucide-react";
import { deleteAdminUser } from "@/lib/actions/adminUser";

export default function DeleteAdminButton({ id, name }: { id: string; name: string }) {
  async function handleDelete() {
    if (confirm(`Are you sure you want to delete ${name}?\nTheir access will be immediately revoked.`)) {
      try {
        await deleteAdminUser(id);
      } catch (err: any) {
        alert(err.message || "Failed to delete");
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
      title="Delete Sub-Admin"
    >
      <Trash2 size={18} />
    </button>
  );
}

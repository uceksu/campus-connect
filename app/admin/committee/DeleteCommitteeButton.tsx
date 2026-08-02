"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteCommitteeMember } from "@/lib/actions/committee";

export default function DeleteCommitteeButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this committee member?")) return;
    
    setIsDeleting(true);
    try {
      await deleteCommitteeMember(id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete member.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
      title="Delete member"
    >
      <Trash2 size={16} />
    </button>
  );
}

"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteAcademicSubject } from "@/lib/actions/academicSubject";

export default function DeleteSubjectButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this subject?")) return;
    
    setIsDeleting(true);
    try {
      await deleteAcademicSubject(id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete subject.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
      title="Delete subject"
    >
      <Trash2 size={16} />
    </button>
  );
}

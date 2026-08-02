"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteFaculty } from "@/lib/actions/faculty";

export default function DeleteFacultyButton({ id, name }: { id: string; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteFaculty(id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete faculty member");
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
    >
      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : "Delete"}
    </button>
  );
}

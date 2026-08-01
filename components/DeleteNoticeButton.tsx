"use client";

import { useTransition } from "react";
import { deleteNotice } from "@/lib/actions/notice";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteNoticeButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    startTransition(async () => {
      await deleteNotice(id);
      window.location.reload();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 disabled:opacity-50 transition-all text-sm font-medium"
    >
      {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}

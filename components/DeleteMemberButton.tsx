"use client";

import { useTransition } from "react";
import { deleteKsuMember } from "@/lib/actions/member";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteMemberButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    startTransition(async () => {
      await deleteKsuMember(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 disabled:opacity-50 transition-colors"
      title="Delete Member"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}

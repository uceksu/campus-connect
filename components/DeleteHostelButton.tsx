"use client";

import { useTransition } from "react";
import { deleteHostel } from "@/lib/actions/hostel";

export default function DeleteHostelButton({
  id,
}: {
  id: string;
}) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hostel?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteHostel(id);
      window.location.reload();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
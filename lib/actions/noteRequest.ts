"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function getNoteRequests() {
  return await prisma.noteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createNoteRequest(data: {
  subject: string;
  semester: string;
  branch: string;
  studentName: string;
  message?: string;
}) {
  await prisma.noteRequest.create({
    data,
  });
  revalidatePath("/academics");
  revalidatePath("/admin/note-requests");
}

export async function resolveNoteRequest(id: string) {
  await prisma.noteRequest.update({
    where: { id },
    data: { status: "RESOLVED" },
  });
  revalidatePath("/admin/note-requests");
}

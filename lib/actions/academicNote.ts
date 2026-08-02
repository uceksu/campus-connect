"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { AcademicNote } from "@/src/generated/prisma/client";

export async function getAcademicNotes(): Promise<AcademicNote[]> {
  return await prisma.academicNote.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getAcademicNotesByBranch(branch: string): Promise<AcademicNote[]> {
  return await prisma.academicNote.findMany({
    where: branch === "All" ? {} : { branch },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAcademicNoteById(id: string): Promise<AcademicNote | null> {
  return await prisma.academicNote.findUnique({ where: { id } });
}

export async function createAcademicNote(data: {
  title: string;
  subject: string;
  semester: string;
  branch: string;
  scheme: string;
  type: string;
  module: string;
  description: string;
  fileUrl: string;
  uploadedBy: string;
}) {
  await prisma.academicNote.create({ data });
  revalidatePath("/admin/academic-notes");
  revalidatePath("/academics");
}

export async function updateAcademicNote(
  id: string,
  data: {
    title: string;
    subject: string;
    semester: string;
    branch: string;
    scheme: string;
    type: string;
    module: string;
    description: string;
    fileUrl: string;
    uploadedBy: string;
  }
) {
  await prisma.academicNote.update({ where: { id }, data });
  revalidatePath("/admin/academic-notes");
  revalidatePath("/academics");
}

export async function deleteAcademicNote(id: string) {
  await prisma.academicNote.delete({ where: { id } });
  revalidatePath("/admin/academic-notes");
  revalidatePath("/academics");
}

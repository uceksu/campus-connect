"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { AcademicSubject } from "@/src/generated/prisma/client";

export async function getAcademicSubjects(): Promise<AcademicSubject[]> {
  return await prisma.academicSubject.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getAcademicSubjectById(id: string): Promise<AcademicSubject | null> {
  return await prisma.academicSubject.findUnique({ where: { id } });
}

export async function createAcademicSubject(data: {
  name: string;
  branch: string;
  semester: string;
  scheme: string;
  syllabusUrl?: string | null;
}) {
  await prisma.academicSubject.create({
    data: {
      name: data.name,
      branch: data.branch,
      semester: data.semester,
      scheme: data.scheme,
      syllabusUrl: data.syllabusUrl,
    },
  });
  revalidatePath("/academics");
  revalidatePath("/admin/subjects");
}

export async function updateAcademicSubject(
  id: string,
  data: {
    name: string;
    branch: string;
    semester: string;
    scheme: string;
    syllabusUrl?: string | null;
  }
) {
  await prisma.academicSubject.update({
    where: { id },
    data: {
      name: data.name,
      branch: data.branch,
      semester: data.semester,
      scheme: data.scheme,
      syllabusUrl: data.syllabusUrl,
    },
  });
  revalidatePath("/academics");
  revalidatePath("/admin/subjects");
}

export async function deleteAcademicSubject(id: string) {
  await prisma.academicSubject.delete({ where: { id } });
  revalidatePath("/academics");
  revalidatePath("/admin/subjects");
}

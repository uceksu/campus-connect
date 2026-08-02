"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { Scholarship } from "@/src/generated/prisma/client";

export async function getScholarships(): Promise<Scholarship[]> {
  return await prisma.scholarship.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getScholarshipById(id: string): Promise<Scholarship | null> {
  return await prisma.scholarship.findUnique({ where: { id } });
}

export async function createScholarship(data: {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string;
  description: string;
  applyLink: string;
}) {
  await prisma.scholarship.create({ data });
  revalidatePath("/scholarships");
  revalidatePath("/admin/scholarships");
}

export async function updateScholarship(
  id: string,
  data: {
    name: string;
    provider: string;
    amount: string;
    deadline: string;
    eligibility: string;
    description: string;
    applyLink: string;
  }
) {
  await prisma.scholarship.update({ where: { id }, data });
  revalidatePath("/scholarships");
  revalidatePath("/admin/scholarships");
}

export async function deleteScholarship(id: string) {
  await prisma.scholarship.delete({ where: { id } });
  revalidatePath("/scholarships");
  revalidatePath("/admin/scholarships");
}

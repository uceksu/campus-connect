"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { Department } from "@/src/generated/prisma/client";

export async function getDepartments() {
  return await prisma.department.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      faculty: true,
      _count: {
        select: { faculty: true }
      }
    }
  });
}

export async function getDepartmentById(id: string) {
  return await prisma.department.findUnique({
    where: { id },
  });
}

export async function getDepartmentByShortName(shortName: string) {
  return await prisma.department.findFirst({
    where: { shortName: { equals: shortName, mode: "insensitive" } },
    include: {
      faculty: {
        orderBy: [
          { isHOD: "desc" },
          { name: "asc" }
        ]
      }
    }
  });
}

export async function createDepartment(data: {
  name: string;
  shortName: string;
  description: string;
}) {
  await prisma.department.create({ data });
  revalidatePath("/departments");
  revalidatePath("/admin/departments");
}

export async function updateDepartment(
  id: string,
  data: {
    name: string;
    shortName: string;
    description: string;
  }
) {
  await prisma.department.update({ where: { id }, data });
  revalidatePath("/departments");
  revalidatePath("/admin/departments");
}

export async function deleteDepartment(id: string) {
  await prisma.department.delete({ where: { id } });
  revalidatePath("/departments");
  revalidatePath("/admin/departments");
}

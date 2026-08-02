"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function getFacultyByDepartment(departmentId: string) {
  return await prisma.faculty.findMany({
    where: { departmentId },
    orderBy: [
      { isHOD: "desc" },
      { name: "asc" }
    ]
  });
}

export async function getFacultyById(id: string) {
  return await prisma.faculty.findUnique({
    where: { id },
  });
}

export async function createFaculty(data: {
  name: string;
  designation: string;
  specialization?: string | null;
  email?: string | null;
  phone?: string | null;
  isHOD: boolean;
  image?: string | null;
  departmentId: string;
}) {
  // If this faculty is HOD, remove HOD status from others in same dept
  if (data.isHOD) {
    await prisma.faculty.updateMany({
      where: { departmentId: data.departmentId, isHOD: true },
      data: { isHOD: false },
    });
  }

  await prisma.faculty.create({ data });
  revalidatePath("/departments");
  revalidatePath(`/admin/departments/${data.departmentId}/faculty`);
}

export async function updateFaculty(
  id: string,
  data: {
    name: string;
    designation: string;
    specialization?: string | null;
    email?: string | null;
    phone?: string | null;
    isHOD: boolean;
    image?: string | null;
    departmentId: string;
  }
) {
  if (data.isHOD) {
    await prisma.faculty.updateMany({
      where: { departmentId: data.departmentId, isHOD: true, id: { not: id } },
      data: { isHOD: false },
    });
  }

  await prisma.faculty.update({ where: { id }, data });
  revalidatePath("/departments");
  revalidatePath(`/admin/departments/${data.departmentId}/faculty`);
}

export async function deleteFaculty(id: string) {
  const faculty = await prisma.faculty.findUnique({ where: { id } });
  if (!faculty) return;
  
  await prisma.faculty.delete({ where: { id } });
  revalidatePath("/departments");
  revalidatePath(`/admin/departments/${faculty.departmentId}/faculty`);
}

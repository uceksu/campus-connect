"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

export async function checkSuperAdmin() {
  const session = await auth();
  const role = session?.user?.role;
  const permissions = (session?.user as any)?.permissions || [];

  if (role === "SUPER_ADMIN") return;
  if (role === "ADMIN" && permissions.includes("sub-admins")) return;

  throw new Error("Unauthorized: Only Super Admins or Admins with sub-admins permission can perform this action");
}

export async function createAdminUser(data: {
  name: string;
  email: string;
  password?: string;
  permissions: string[];
}) {
  await checkSuperAdmin();

  // If password not provided, generate a random one
  const plainPassword = data.password || Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "ADMIN",
      permissions: data.permissions,
    },
  });

  revalidatePath("/admin/sub-admins");
  return { success: true, plainPassword, user };
}

export async function updateAdminUser(id: string, data: {
  name: string;
  email: string;
  permissions: string[];
  password?: string;
}) {
  await checkSuperAdmin();

  const updateData: any = {
    name: data.name,
    email: data.email,
    permissions: data.permissions,
  };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  await prisma.user.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/sub-admins");
  return { success: true };
}

export async function deleteAdminUser(id: string) {
  await checkSuperAdmin();

  await prisma.user.delete({
    where: { id, role: "ADMIN" },
  });

  revalidatePath("/admin/sub-admins");
  return { success: true };
}

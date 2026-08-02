"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import type { Developer } from "@/src/generated/prisma/client";

export async function getDevelopers() {
  try {
    const developers = await prisma.developer.findMany({
      orderBy: { createdAt: "asc" },
    });
    return developers;
  } catch (error) {
    console.error("Failed to fetch developers:", error);
    return [];
  }
}

export async function getDeveloper(id: string) {
  try {
    const developer = await prisma.developer.findUnique({
      where: { id },
    });
    return developer;
  } catch (error) {
    console.error("Failed to fetch developer:", error);
    return null;
  }
}

export async function createDeveloper(data: Omit<Developer, "id" | "createdAt" | "updatedAt">) {
  try {
    const developer = await prisma.developer.create({
      data,
    });
    revalidatePath("/admin/developers");
    revalidatePath("/about-campus-connect");
    return developer;
  } catch (error) {
    console.error("Failed to create developer:", error);
    throw new Error("Failed to create developer.");
  }
}

export async function updateDeveloper(id: string, data: Partial<Omit<Developer, "id" | "createdAt" | "updatedAt">>) {
  try {
    const developer = await prisma.developer.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/developers");
    revalidatePath("/about-campus-connect");
    return developer;
  } catch (error) {
    console.error("Failed to update developer:", error);
    throw new Error("Failed to update developer.");
  }
}

export async function deleteDeveloper(id: string) {
  try {
    await prisma.developer.delete({
      where: { id },
    });
    revalidatePath("/admin/developers");
    revalidatePath("/about-campus-connect");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete developer:", error);
    throw new Error("Failed to delete developer.");
  }
}

"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { Club } from "@/src/generated/prisma/client";

export async function getClubs(): Promise<Club[]> {
  return await prisma.club.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getClubById(id: string): Promise<Club | null> {
  return await prisma.club.findUnique({ where: { id } });
}

export async function createClub(data: {
  name: string;
  category: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  meetingSchedule: string;
  imageUrl: string;
}) {
  await prisma.club.create({
    data: {
      name: data.name,
      image: data.imageUrl,
      category: data.category,
      description: data.description,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      meetingSchedule: data.meetingSchedule,
    },
  });
  revalidatePath("/admin/clubs");
  revalidatePath("/clubs");
}

export async function updateClub(
  id: string,
  data: {
    name: string;
    category: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
    meetingSchedule: string;
    imageUrl: string;
  }
) {
  await prisma.club.update({
    where: { id },
    data: {
      name: data.name,
      image: data.imageUrl,
      category: data.category,
      description: data.description,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      meetingSchedule: data.meetingSchedule,
    },
  });
  revalidatePath("/admin/clubs");
  revalidatePath("/clubs");
}

export async function deleteClub(id: string) {
  await prisma.club.delete({ where: { id } });
  revalidatePath("/admin/clubs");
  revalidatePath("/clubs");
}

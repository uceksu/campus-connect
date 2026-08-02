"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { Notice } from "@/src/generated/prisma/client";

export async function getNotices(): Promise<Notice[]> {
  return await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getNoticeById(id: string): Promise<Notice | null> {
  return await prisma.notice.findUnique({ where: { id } });
}

export async function createNotice(data: {
  title: string;
  content: string;
  category: string;
  image?: string | null;
  isImportant: boolean;
}) {
  await prisma.notice.create({ data });
  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}

export async function updateNotice(
  id: string,
  data: {
    title: string;
    content: string;
    category: string;
    image?: string | null;
    isImportant: boolean;
  }
) {
  await prisma.notice.update({ where: { id }, data });
  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}

export async function deleteNotice(id: string) {
  await prisma.notice.delete({ where: { id } });
  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}

"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { Notice } from "@/src/generated/prisma/client";
import { logAdminAction } from "./adminLog";

export async function getNotices(): Promise<Notice[]> {
  return await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublicNotices(): Promise<Notice[]> {
  const now = new Date();
  return await prisma.notice.findMany({
    where: {
      OR: [
        { status: "PUBLISHED" },
        {
          status: "SCHEDULED",
          publishAt: { lte: now },
        },
      ],
    },
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
  status?: string;
  publishAt?: Date | null;
}) {
  await prisma.notice.create({ data });
  await logAdminAction("CREATE_NOTICE", data.title, `Created notice (${data.status || "PUBLISHED"})`);
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
    status?: string;
    publishAt?: Date | null;
  }
) {
  await prisma.notice.update({ where: { id }, data });
  await logAdminAction("UPDATE_NOTICE", data.title, `Updated notice (${data.status || "PUBLISHED"})`);
  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}

export async function deleteNotice(id: string) {
  const notice = await getNoticeById(id);
  if (notice) {
    await logAdminAction("DELETE_NOTICE", notice.title, `Deleted notice`);
  }
  await prisma.notice.delete({ where: { id } });
  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}

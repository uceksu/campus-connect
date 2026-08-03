"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function logAdminAction(action: string, target: string, details?: string) {
  try {
    const session = await auth();
    if (!session?.user) return;

    await prisma.adminLog.create({
      data: {
        adminId: session.user.id || "unknown",
        adminName: session.user.name || session.user.email || "Unknown Admin",
        action,
        target,
        details,
      },
    });
  } catch (error) {
    console.error("Failed to log admin action:", error);
    // Non-blocking, so we just swallow the error if logging fails
  }
}

export async function getAdminLogs() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  return prisma.adminLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100, // Show last 100 logs
  });
}

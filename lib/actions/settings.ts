"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Get the current maintenance mode status
 */
export async function getMaintenanceMode() {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: "maintenance_mode" },
    });
    
    return setting?.value === "true";
  } catch (error) {
    console.error("Error fetching maintenance mode:", error);
    return false;
  }
}

/**
 * Toggle maintenance mode (SUPER_ADMIN only)
 */
export async function toggleMaintenanceMode(isEnabled: boolean) {
  try {
    const session = await auth();
    
    // Only super admins can toggle maintenance mode
    if (session?.user?.role !== "SUPER_ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.setting.upsert({
      where: { key: "maintenance_mode" },
      update: { value: isEnabled ? "true" : "false" },
      create: { key: "maintenance_mode", value: isEnabled ? "true" : "false" },
    });

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Error toggling maintenance mode:", error);
    return { success: false, error: "Internal server error" };
  }
}

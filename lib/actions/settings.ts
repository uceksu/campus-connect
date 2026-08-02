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

/**
 * Get the current admin portal visibility status
 */
export async function getAdminPortalVisibility() {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: "admin_portal_visible" },
    });
    
    // Default to true if not set
    return setting ? setting.value === "true" : true;
  } catch (error) {
    console.error("Error fetching admin portal visibility:", error);
    return true;
  }
}

/**
 * Toggle admin portal visibility (SUPER_ADMIN only)
 */
export async function toggleAdminPortalVisibility(isVisible: boolean) {
  try {
    const session = await auth();
    
    if (session?.user?.role !== "SUPER_ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.setting.upsert({
      where: { key: "admin_portal_visible" },
      update: { value: isVisible ? "true" : "false" },
      create: { key: "admin_portal_visible", value: isVisible ? "true" : "false" },
    });

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Error toggling admin portal visibility:", error);
    return { success: false, error: "Internal server error" };
  }
}

/**
 * Get the current site logo URL
 */
export async function getSiteLogo() {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: "site_logo" },
    });
    return setting?.value || null;
  } catch (error) {
    console.error("Error fetching site logo:", error);
    return null;
  }
}

/**
 * Update site logo URL (SUPER_ADMIN only)
 */
export async function updateSiteLogo(logoUrl: string | null) {
  try {
    const session = await auth();
    
    if (session?.user?.role !== "SUPER_ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    if (logoUrl === null) {
      await prisma.setting.deleteMany({
        where: { key: "site_logo" },
      });
    } else {
      await prisma.setting.upsert({
        where: { key: "site_logo" },
        update: { value: logoUrl },
        create: { key: "site_logo", value: logoUrl },
      });
    }

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating site logo:", error);
    return { success: false, error: "Internal server error" };
  }
}

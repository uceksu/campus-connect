"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { customAlphabet } from "nanoid";
import type { KsuMember } from "@/src/generated/prisma/client";

import { sendWelcomeEmail } from "@/lib/email";

const generateShortId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4);

export async function registerKsuMember(data: {
  name: string;
  email: string;
  phone?: string;
  department: string;
  year?: string;
  location?: string;
  photoUrl?: string;
}) {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  let memberId = "";
  let isUnique = false;

  while (!isUnique) {
    memberId = `KSU-${currentYear}-${generateShortId()}`;
    const existing = await prisma.ksuMember.findUnique({ where: { memberId } });
    if (!existing) isUnique = true;
  }

  const member = await prisma.ksuMember.create({
    data: {
      memberId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      year: data.year,
      location: data.location,
      photoUrl: data.photoUrl,
    },
  });

  // Await welcome email send so Next.js server action completes dispatch
  const settings = await getJoinFormSettings();
  try {
    await sendWelcomeEmail(data.email, {
      name: data.name,
      memberId,
      department: data.department,
      whatsappLink: settings.whatsappLink,
    });
  } catch (emailErr) {
    console.error("Error sending welcome email:", emailErr);
  }

  return member;
}

export async function getKsuMembers(): Promise<KsuMember[]> {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return await prisma.ksuMember.findMany({
    orderBy: { joinedAt: "desc" },
  });
}

export async function deleteKsuMember(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.ksuMember.delete({ where: { id } });
  revalidatePath("/admin/members");
  return { success: true };
}

export async function bulkDeleteKsuMembers(ids: string[]) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.ksuMember.deleteMany({
    where: { id: { in: ids } },
  });
  revalidatePath("/admin/members");
  return { success: true };
}

// Settings specifically for the KSU Join Form
export async function getJoinFormSettings() {
  const settings = await prisma.setting.findMany({
    where: { 
      key: { 
        in: [
          "join_require_year", 
          "join_require_location", 
          "join_require_photo", 
          "join_whatsapp_link",
          "join_card_color",
          "join_card_signature"
        ] 
      } 
    },
  });
  
  const map = new Map(settings.map((s) => [s.key, s.value]));
  
  return {
    requireYear: map.get("join_require_year") !== "false", // Default true
    requireLocation: map.get("join_require_location") !== "false", // Default true
    requirePhoto: map.get("join_require_photo") === "true", // Default false
    whatsappLink: map.get("join_whatsapp_link") || "", // Default empty string
    cardColor: map.get("join_card_color") || "#071333", // Default KSU Blue
    cardSignature: map.get("join_card_signature") || "Official KSU Member",
  };
}

export async function toggleJoinFormSetting(key: "join_require_year" | "join_require_location" | "join_require_photo", isEnabled: boolean) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.setting.upsert({
    where: { key },
    update: { value: isEnabled ? "true" : "false" },
    create: { key, value: isEnabled ? "true" : "false" },
  });

  revalidatePath("/join");
  revalidatePath("/admin/members");
  return { success: true };
}

export async function updateWhatsappLinkSetting(link: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.setting.upsert({
    where: { key: "join_whatsapp_link" },
    update: { value: link },
    create: { key: "join_whatsapp_link", value: link },
  });

  revalidatePath("/join");
  revalidatePath("/admin/members");
  return { success: true };
}

export async function updateCardSettings(color: string, signature: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.setting.upsert({
    where: { key: "join_card_color" },
    update: { value: color },
    create: { key: "join_card_color", value: color },
  });

  await prisma.setting.upsert({
    where: { key: "join_card_signature" },
    update: { value: signature },
    create: { key: "join_card_signature", value: signature },
  });

  revalidatePath("/join");
  revalidatePath("/admin/members");
  return { success: true };
}

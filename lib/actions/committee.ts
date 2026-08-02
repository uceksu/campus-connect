"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { CommitteeMember } from "@/src/generated/prisma/client";

export async function getCommitteeMembers(): Promise<CommitteeMember[]> {
  return await prisma.committeeMember.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCommitteeMemberById(id: string): Promise<CommitteeMember | null> {
  return await prisma.committeeMember.findUnique({ where: { id } });
}

export async function createCommitteeMember(data: {
  name: string;
  role: string;
  organization: string;
  whatsapp: string;
  instagram: string;
  imageUrl: string;
}) {
  await prisma.committeeMember.create({
    data: {
      name: data.name,
      role: data.role,
      organization: data.organization,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      image: data.imageUrl,
    },
  });
  revalidatePath("/about-ksu");
  revalidatePath("/admin/committee");
}

export async function updateCommitteeMember(
  id: string,
  data: {
    name: string;
    role: string;
    organization: string;
    whatsapp: string;
    instagram: string;
    imageUrl: string;
  }
) {
  await prisma.committeeMember.update({
    where: { id },
    data: {
      name: data.name,
      role: data.role,
      organization: data.organization,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      image: data.imageUrl,
    },
  });
  revalidatePath("/about-ksu");
  revalidatePath("/admin/committee");
}

export async function deleteCommitteeMember(id: string) {
  await prisma.committeeMember.delete({ where: { id } });
  revalidatePath("/about-ksu");
  revalidatePath("/admin/committee");
}

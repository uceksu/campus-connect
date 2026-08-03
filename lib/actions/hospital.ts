"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { Hospital } from "@/src/generated/prisma/client";

export async function getHospitals(): Promise<Hospital[]> {
  return await prisma.hospital.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getHospitalById(id: string): Promise<Hospital | null> {
  return await prisma.hospital.findUnique({ where: { id } });
}

export async function createHospital(data: {
  name: string;
  address: string;
  phone: string;
  emergencyContact: string;
  maps: string;
  description: string;
  imageUrl: string;
}) {
  await prisma.hospital.create({
    data: {
      name: data.name,
      image: data.imageUrl,
      address: data.address,
      phone: data.phone,
      emergencyContact: data.emergencyContact,
      maps: data.maps,
      description: data.description,
    },
  });
  revalidatePath("/campus/hospitals");
  revalidatePath("/admin/hospitals");
}

export async function updateHospital(
  id: string,
  data: {
    name: string;
    address: string;
    phone: string;
    emergencyContact: string;
    maps: string;
    description: string;
    imageUrl: string;
  }
) {
  await prisma.hospital.update({
    where: { id },
    data: {
      name: data.name,
      image: data.imageUrl,
      address: data.address,
      phone: data.phone,
      emergencyContact: data.emergencyContact,
      maps: data.maps,
      description: data.description,
    },
  });
  revalidatePath("/campus/hospitals");
  revalidatePath("/admin/hospitals");
}

export async function deleteHospital(id: string) {
  await prisma.hospital.delete({ where: { id } });
  revalidatePath("/campus/hospitals");
  revalidatePath("/admin/hospitals");
}

"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { Hostel } from "@/src/generated/prisma/client";
import { logAdminAction } from "./adminLog";

export async function getHostels(): Promise<Hostel[]> {
  return await prisma.hostel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getHostelById(id: string): Promise<Hostel | null> {
  return await prisma.hostel.findUnique({
    where: {
      id,
    },
  });
}

export async function createHostel(data: {
  name: string;
  type: string;
  distance: string;
  rating: string;
  price: string;
  phone: string;
  maps: string;
  description: string;
  imageUrl: string;
}) {
  await prisma.hostel.create({
    data: {
      name: data.name,
      type: data.type,
      image: data.imageUrl,
      distance: data.distance,
      rating: Number(data.rating),
      phone: data.phone,
      maps: data.maps,
      price: data.price,
      description: data.description,
    },
  });
  
  await logAdminAction("CREATE_HOSTEL", data.name, `Created ${data.type} hostel`);
  revalidatePath("/campus/hostels");
  revalidatePath("/admin/hostels");
}

export async function updateHostel(
  id: string,
  data: {
    name: string;
    type: string;
    distance: string;
    rating: string;
    price: string;
    phone: string;
    maps: string;
    description: string;
    imageUrl: string;
  }
) {
  await prisma.hostel.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      type: data.type,
      distance: data.distance,
      rating: Number(data.rating),
      price: data.price,
      phone: data.phone,
      maps: data.maps,
      description: data.description,
      image: data.imageUrl,
    },
  });

  await logAdminAction("UPDATE_HOSTEL", data.name, `Updated hostel details`);
  revalidatePath("/campus/hostels");
  revalidatePath("/admin/hostels");
}

export async function deleteHostel(id: string) {
  const hostel = await getHostelById(id);
  if (hostel) {
    await logAdminAction("DELETE_HOSTEL", hostel.name, `Deleted hostel`);
  }

  await prisma.hostel.delete({
    where: {
      id,
    },
  });
  revalidatePath("/campus/hostels");
  revalidatePath("/admin/hostels");
}
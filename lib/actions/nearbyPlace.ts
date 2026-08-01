"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { NearbyPlace } from "@/src/generated/prisma/client";

export async function getNearbyPlaces(): Promise<NearbyPlace[]> {
  return await prisma.nearbyPlace.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getNearbyPlaceById(id: string): Promise<NearbyPlace | null> {
  return await prisma.nearbyPlace.findUnique({ where: { id } });
}

export async function createNearbyPlace(data: {
  name: string;
  category: string;
  address: string;
  phone: string;
  maps: string;
  description: string;
  rating: string;
  imageUrl: string;
}) {
  await prisma.nearbyPlace.create({
    data: {
      name: data.name,
      image: data.imageUrl,
      category: data.category,
      address: data.address,
      phone: data.phone,
      maps: data.maps,
      description: data.description,
      rating: Number(data.rating),
    },
  });
  revalidatePath("/admin/nearby-places");
}

export async function updateNearbyPlace(
  id: string,
  data: {
    name: string;
    category: string;
    address: string;
    phone: string;
    maps: string;
    description: string;
    rating: string;
    imageUrl: string;
  }
) {
  await prisma.nearbyPlace.update({
    where: { id },
    data: {
      name: data.name,
      image: data.imageUrl,
      category: data.category,
      address: data.address,
      phone: data.phone,
      maps: data.maps,
      description: data.description,
      rating: Number(data.rating),
    },
  });
  revalidatePath("/admin/nearby-places");
}

export async function deleteNearbyPlace(id: string) {
  await prisma.nearbyPlace.delete({ where: { id } });
  revalidatePath("/admin/nearby-places");
}

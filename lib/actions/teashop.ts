"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { TeaShop } from "@/src/generated/prisma/client";

export async function getTeaShops(): Promise<TeaShop[]> {
  return await prisma.teaShop.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTeaShopById(id: string): Promise<TeaShop | null> {
  return await prisma.teaShop.findUnique({ where: { id } });
}

export async function createTeaShop(data: {
  name: string;
  address: string;
  phone: string;
  maps: string;
  description: string;
  rating: string;
  price: string;
  imageUrl: string;
}) {
  await prisma.teaShop.create({
    data: {
      name: data.name,
      image: data.imageUrl,
      address: data.address,
      phone: data.phone,
      maps: data.maps,
      description: data.description,
      rating: Number(data.rating),
      price: data.price,
    },
  });
  revalidatePath("/campus/teashops");
  revalidatePath("/admin/teashops");
}

export async function updateTeaShop(
  id: string,
  data: {
    name: string;
    address: string;
    phone: string;
    maps: string;
    description: string;
    rating: string;
    price: string;
    imageUrl: string;
  }
) {
  await prisma.teaShop.update({
    where: { id },
    data: {
      name: data.name,
      image: data.imageUrl,
      address: data.address,
      phone: data.phone,
      maps: data.maps,
      description: data.description,
      rating: Number(data.rating),
      price: data.price,
    },
  });
  revalidatePath("/campus/teashops");
  revalidatePath("/admin/teashops");
}

export async function deleteTeaShop(id: string) {
  await prisma.teaShop.delete({ where: { id } });
  revalidatePath("/campus/teashops");
  revalidatePath("/admin/teashops");
}

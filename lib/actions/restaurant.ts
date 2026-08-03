"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { Restaurant } from "@/src/generated/prisma/client";

export async function getRestaurants(): Promise<Restaurant[]> {
  return await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  return await prisma.restaurant.findUnique({ where: { id } });
}

export async function createRestaurant(data: {
  name: string;
  address: string;
  phone: string;
  maps: string;
  description: string;
  rating: string;
  price: string;
  imageUrl: string;
}) {
  await prisma.restaurant.create({
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
  revalidatePath("/campus/restaurants");
  revalidatePath("/admin/restaurants");
}

export async function updateRestaurant(
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
  await prisma.restaurant.update({
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
  revalidatePath("/campus/restaurants");
  revalidatePath("/admin/restaurants");
}

export async function deleteRestaurant(id: string) {
  await prisma.restaurant.delete({ where: { id } });
  revalidatePath("/campus/restaurants");
  revalidatePath("/admin/restaurants");
}

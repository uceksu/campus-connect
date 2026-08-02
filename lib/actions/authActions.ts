"use server";

import { signOut } from "@/auth";

import { redirect } from "next/navigation";

export async function logOut() {
  await signOut({ redirect: false });
  redirect("/");
}

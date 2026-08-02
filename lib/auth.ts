import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export interface CredentialArgs {
  email?: string;
  password?: string;
}

export async function authorizeCredentials({
  email,
  password,
}: CredentialArgs) {
  if (!email || !password) {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  };
}

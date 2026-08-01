import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const ADMIN_EMAIL = "admin@ksuuce.com";
const ADMIN_PASSWORD = "Admin@123";
const ADMIN_NAME = "Super Admin";
const ADMIN_ROLE = "SUPER_ADMIN" as const;
const SALT_ROUNDS = 12;

async function main() {
  console.log("Starting seed: create super admin user if it does not exist...");

  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log(`Super admin already exists: ${existingAdmin.email}`);
    return;
  }

  console.log("Super admin not found. Hashing password and creating account...");
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

  const superAdmin = await prisma.user.create({
    data: {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: ADMIN_ROLE,
    },
  });

  console.log("✅ Super admin created successfully:", superAdmin.email);
}

main()
  .catch((error) => {
    console.error("Failed to seed super admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
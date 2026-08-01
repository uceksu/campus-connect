import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const DATABASE_URL = process.env.DATABASE_URL;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (!DATABASE_URL) {
  throw new Error(
    "Missing DATABASE_URL. Set DATABASE_URL in .env or in the environment before running Prisma or the app."
  );
}

if (
  DATABASE_URL.includes("YOUR_PASSWORD") ||
  DATABASE_URL.includes("replace-this-with-a-random-long-secret-key")
) {
  throw new Error(
    "Invalid DATABASE_URL: replace placeholder values with your actual PostgreSQL credentials.\n" +
      "For Neon, use the full connection string with a real password and sslmode=verify-full."
  );
}

if (!NEXTAUTH_SECRET) {
  console.warn(
    "WARNING: NEXTAUTH_SECRET is not set. Set NEXTAUTH_SECRET in .env for secure auth session signing."
  );
}

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
  pgPool?: pg.Pool;
};

// Cache the pool on globalThis to prevent pool accumulation during hot reloads
const pool =
  globalForPrisma.pgPool ??
  new pg.Pool({
    connectionString: DATABASE_URL,
    max: 5, // Set max connections low for Neon free tier
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
}

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
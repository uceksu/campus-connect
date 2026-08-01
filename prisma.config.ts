import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const DATABASE_URL = env("DATABASE_URL");

if (
  DATABASE_URL.includes("YOUR_PASSWORD") ||
  DATABASE_URL.includes("replace-this-with-a-random-long-secret-key")
) {
  throw new Error(
    "Invalid DATABASE_URL in prisma.config.ts: replace placeholder values with your actual PostgreSQL credentials."
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: DATABASE_URL,
  },
});
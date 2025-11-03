import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Provide fallback for build environments where DATABASE_URL isn't set yet
    // Prisma generate doesn't actually connect, so this is safe
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
});

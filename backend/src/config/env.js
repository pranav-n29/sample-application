import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const baseEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8080),
});

const parsed = baseEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const corsOrigin =
  process.env.CORS_ORIGIN ??
  (parsed.data.NODE_ENV === "development" || parsed.data.NODE_ENV === "test"
    ? "http://localhost:5173"
    : undefined);

if (!corsOrigin) {
  console.error("Invalid environment variables:");
  console.error({ CORS_ORIGIN: ["Required"] });
  process.exit(1);
}

const corsOriginParsed = z.string().url().safeParse(corsOrigin);

if (!corsOriginParsed.success) {
  console.error("Invalid environment variables:");
  console.error(corsOriginParsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  CORS_ORIGIN: corsOriginParsed.data,
};

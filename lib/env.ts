import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is missing — set it in .env (see .env.example)."),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is missing — generate one with `npx auth secret`."),
  AUTH_URL: z.string().min(1, "AUTH_URL is missing — set the public base URL of the app."),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const names = parsed.error.issues.map((issue) => issue.path.join(".")).filter(Boolean);
  console.error("Environment configuration error — fix these before starting the app:");
  for (const name of names) console.error(`  - ${name}`);
  throw new Error(`Invalid environment. Missing or invalid variables: ${names.join(", ")}`);
}

export const env = parsed.data;
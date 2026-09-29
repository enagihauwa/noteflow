import { z } from "zod";

const envSchema = z.object({
  FIREBASE_PROJECT_ID: z.string().min(1, "FIREBASE_PROJECT_ID is missing — set it in .env (see .env.example)."),
  FIREBASE_CLIENT_EMAIL: z
    .string()
    .min(1, "FIREBASE_CLIENT_EMAIL is missing — set it from the Firebase service account JSON."),
  FIREBASE_PRIVATE_KEY: z
    .string()
    .min(1, "FIREBASE_PRIVATE_KEY is missing — set it from the Firebase service account JSON (\\n stays literal)."),
  FIREBASE_API_KEY: z.string().min(1, "FIREBASE_API_KEY is missing — set it from the Firebase web app config."),
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
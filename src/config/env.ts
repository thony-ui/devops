import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// Define Zod schema for environment variables
const envSchema = z.object({
  MONGO_URI: z.string().url(),
  MONGO_DB: z.string().min(1),
  PORT: z.string().optional(), // Example: if you have other envs like server port
});

// Validate process.env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error("Invalid or missing environment variables");
}

// Export the validated env
export const env = parsedEnv.data;

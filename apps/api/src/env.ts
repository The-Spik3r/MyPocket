import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Server Configuration
  PORT: z.coerce.number().positive().default(3000),

  // Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// Validate environment variables
const validatedEnv = envSchema.parse(process.env);

export const env = validatedEnv;

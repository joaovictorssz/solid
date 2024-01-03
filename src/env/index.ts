import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENVIRONMENT: z.string(),
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    throw new Error('Invalid environment variables. Follow the .env.example to create your .env correctly.');
}

export const env = _env.data;
import { z } from 'zod';

const modes = ['development', 'production', 'test'] as const;

function inferMode(): (typeof modes)[number] {
  const m = import.meta.env.MODE;
  if (m === 'development' || m === 'production' || m === 'test') return m;
  return import.meta.env.DEV ? 'development' : 'production';
}

const schema = z.object({
  MODE: z.enum(modes),
  API_BASE_URL: z
    .string()
    .trim()
    .min(1)
    .transform((s: string) => s.replace(/\/+$/, ''))
    .refine((s: string) => /^https?:\/\/.+/i.test(s)),
  GOOGLE_MAPS_API_KEY: z.string().trim().min(1),
});

export type AppEnv = z.infer<typeof schema>;

export const env: AppEnv = schema.parse({
  MODE: inferMode(),
  API_BASE_URL: import.meta.env.API_BASE_URL,
  GOOGLE_MAPS_API_KEY: import.meta.env.GOOGLE_MAPS_API_KEY,
});

export const { MODE, API_BASE_URL, GOOGLE_MAPS_API_KEY } = env;

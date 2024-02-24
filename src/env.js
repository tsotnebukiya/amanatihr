import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    FIREBASE_APIKEY: z.string(),
    FIREBASE_AUTHDOMAIN: z.string(),
    FIREBASE_PROJECTID: z.string(),
    FIREBASE_STORAGE_BUCKET: z.string(),
    FIREBASE_SENDERID: z.string(),
    FIREBASE_APPID: z.string(),
    FIREBASE_DATABASE_URL: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_SENDERID: process.env.FIREBASE_SENDERID,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

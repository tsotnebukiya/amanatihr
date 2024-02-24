import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import type { Adapter } from 'next-auth/adapters';

import { env } from '@/env';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module 'next-auth' {
  interface User {
    id: string;
    verified: string;
    image: string;
    name: string;
    email: string;
  }
  interface Session extends DefaultSession {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user,
      };
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: env.FIREBASE_PROJECTID,
      privateKey: env.FIREBASE_PRIVATE_KEY
        ? env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
    }),
  }) as Adapter,
};

export const getServerAuthSession = () => getServerSession(authOptions);

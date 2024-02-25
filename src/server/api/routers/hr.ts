import { z } from 'zod';

import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc';
import { firestore } from '@/server/firebase';
import { User } from 'next-auth';
import { TRPCError } from '@trpc/server';

const usersCollection = firestore.collection('users');

export const hrRouter = createTRPCRouter({
  getHR: protectedProcedure.query(async () => {
    const usersCollection = firestore.collection('users');
    const query = usersCollection.orderBy('hr');
    const snapshot = await query.get();
    const list: User[] = [];
    snapshot.forEach((el) => {
      list.push({ id: el.id, ...el.data() } as User);
    });
    return list;
  }),
  verifyHR: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      console.log('HERE');
      const userDocRef = usersCollection.doc(input.id);
      const userDoc = await userDocRef.get();
      const userData = userDoc.data();
      if (userData?.verified) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already verified',
        });
      }
      await userDocRef.update({ verified: true });
      return { id: userDoc.id };
    }),
});

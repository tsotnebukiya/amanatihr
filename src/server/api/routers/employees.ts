import { z } from 'zod';

import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc';
import { firestore } from '@/server/firebase';
import { User } from 'next-auth';
import { TRPCError } from '@trpc/server';

function convertDate(date: any) {
  return new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
}

const usersCollection = firestore.collection('users');

export const employeesRouter = createTRPCRouter({
  getEmployees: protectedProcedure.query(async () => {
    const query = usersCollection.orderBy('birthday');
    const snapshot = await query.get();
    const list: Employee[] = [];
    snapshot.forEach((el) => {
      const birthday = convertDate(el.data().birthday);
      list.push({
        id: el.id,
        ...el.data(),
        birthday,
      } as Employee);
    });
    return list;
  }),
  getEmployee: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      console.log('CHECK1');
      const docRef = usersCollection.doc(input.id);
      console.log('CHECK2');
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No employee found with ID ${input.id}`,
        });
      }
      console.log('CHECK3');
      const data = docSnap.data();
      console.log('CHECK4');
      const birthday = convertDate(data?.birthday);
      return {
        id: docSnap.id,
        ...data,
        birthday,
      } as Employee;
    }),
});

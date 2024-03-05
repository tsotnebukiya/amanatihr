import { z } from 'zod';

import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc';
import { admin, firestore } from '@/server/firebase';
import { User } from 'next-auth';
import { TRPCError } from '@trpc/server';
import { createUserSchema as formSchema } from '@/lib/schemas';
import { calculateAttendance } from '@/lib/getAttendance';

function convertDate(date: any) {
  return new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
}

const usersCollection = firestore.collection('users');
const attendanceCollection = firestore.collection('attendance');

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
      const docRef = usersCollection.doc(input.id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No employee found with ID ${input.id}`,
        });
      }
      const data = docSnap.data();
      const birthday = convertDate(data?.birthday);
      const query = attendanceCollection.where('user_id', '==', input.id);
      const snapshot = await query.get();
      const attendanceRecords: Attendance[] = [];
      snapshot.forEach((doc) => {
        const timestamp = convertDate(doc.data().timestamp);
        const created_at = convertDate(doc.data().created_at);
        attendanceRecords.push({
          id: doc.id,
          ...doc.data(),
          created_at,
          timestamp,
        } as Attendance);
      });
      const result = calculateAttendance(
        attendanceRecords,
        new Date('January 14, 2024')
      );
      console.log(result);
      return {
        employee: {
          id: docSnap.id,
          ...data,
          birthday,
        } as Employee,
        attendance: attendanceRecords,
      };
    }),
  createEmployee: protectedProcedure
    .input(formSchema)
    .mutation(async ({ input }) => {
      const { birthday, email, name, password, surname } = input;
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
      const uid = userRecord.uid;
      await usersCollection.doc(uid).set({
        name,
        surname,
        birthday,
      });
      return uid;
    }),
});

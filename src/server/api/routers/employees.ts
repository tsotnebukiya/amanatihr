import { z } from 'zod';

import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc';
import { admin, firestore } from '@/server/firebase';
import { User } from 'next-auth';
import { TRPCError } from '@trpc/server';
import { createUserSchema as formSchema } from '@/lib/schemas';
import {
  calculateDailyAttendance,
  calculateWeeklyAttendance,
  fetchAttendanceRecords,
  getTopLateEmployeesThisMonth,
} from '@/lib/getAttendance';
import { convertDate } from '@/lib/utils';
import moment from 'moment';

const usersCollection = firestore.collection('usersDummy');
const attendanceCollection = firestore.collection('attendanceDummy');

const timezone = 'Asia/Tbilisi';

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
    .input(
      z.object({
        id: z.string(),
        weeklyString: z.string().optional(),
        dailyString: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { id: userId, dailyString, weeklyString } = input;
      let daily: string = dailyString || moment().toString();
      let weekly: string = weeklyString || moment().day(0).toString();
      const docRef = usersCollection.doc(input.id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No employee found with ID ${input.id}`,
        });
      }
      const weeklyAttendanceRecordsPromise = fetchAttendanceRecords(
        userId,
        weekly,
        attendanceCollection,
        'weekly'
      );
      const dailyAttendanceRecordsPromise = fetchAttendanceRecords(
        userId,
        daily,
        attendanceCollection,
        'daily'
      );
      const [weeklyAttendanceRecords, dailyAttendanceRecords] =
        await Promise.all([
          weeklyAttendanceRecordsPromise,
          dailyAttendanceRecordsPromise,
        ]);

      const weeklyAtt = calculateWeeklyAttendance(weeklyAttendanceRecords);
      const dailyAtt = calculateDailyAttendance(dailyAttendanceRecords);
      // OtherDate
      const data = docSnap.data();
      const birthday = convertDate(data?.birthday);
      return {
        employee: {
          id: docSnap.id,
          ...data,
          birthday,
        } as Employee,
        weeklyAtt,
        dailyAtt,
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
  getDashboardStats: protectedProcedure.query(async () => {
    const result = await getTopLateEmployeesThisMonth(
      new Date('February 3,2024'),

      attendanceCollection,
      usersCollection
    );
    return result;
  }),
});

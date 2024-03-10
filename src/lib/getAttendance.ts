import { admin } from '@/server/firebase';
import { convertDate, getFirstAndLastDayOfMonth, getMonday } from './utils';
import moment from 'moment';
type OneDay = {
  totalAttendanceHours: number;
  firstCheckIn: Date | null;
  lastCheckOut: Date | null;
  lateMinutes: number;
};

export function calculateDailyAttendance(records: Attendance[]): OneDay {
  const sortedRecords = records.sort((a, b) => {
    return a.created_at.getTime() - b.created_at.getTime();
  });
  let totalAttendanceMilliseconds = 0;
  let firstCheckIn: Date | null = null;
  let lastCheckOut: Date | null = null;
  let lastCheckInTime: Date | null = null;
  let lateMinutes: number = 0;

  sortedRecords.forEach((record) => {
    if (record.check_in) {
      if (!firstCheckIn) firstCheckIn = record.created_at;
      lastCheckInTime = record.created_at;
      if (record.created_at.getHours() >= 10) {
        // Check if it's after 10:00 PM
        const lateMilliseconds =
          record.created_at.getTime() -
          new Date(
            record.created_at.getFullYear(),
            record.created_at.getMonth(),
            record.created_at.getDate(),
            10,
            0,
            0,
            0
          ).getTime();
        lateMinutes = lateMilliseconds / (1000 * 60 * 60);
      }
    } else if (lastCheckInTime) {
      totalAttendanceMilliseconds +=
        record.created_at.getTime() - lastCheckInTime.getTime();
      lastCheckOut = record.created_at;
      lastCheckInTime = null;
    }
  });

  const totalAttendanceHours = totalAttendanceMilliseconds / (1000 * 60 * 60);

  return {
    totalAttendanceHours,
    firstCheckIn,
    lastCheckOut,
    lateMinutes,
  };
}

function getDayIndex(day: string): number {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return daysOfWeek.indexOf(day);
}

function filterRecordsByDay(
  records: Attendance[],
  dayOfWeek: string
): Attendance[] {
  return records.filter((record) => {
    const recordDayOfWeek = record.created_at.getDay();
    return recordDayOfWeek === getDayIndex(dayOfWeek);
  });
}

interface WeeklyAttendance extends OneDay {
  dayOfWeek: string;
}

export function calculateWeeklyAttendance(
  records: Attendance[]
): WeeklyAttendance[] {
  const weeklyAttendance: WeeklyAttendance[] = [];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Iterate through each day of the week
  daysOfWeek.forEach((day) => {
    const dailyRecords = filterRecordsByDay(records, day);
    const dailyAttendance = calculateDailyAttendance(dailyRecords);
    const totalAttendanceHoursFixed =
      dailyAttendance.totalAttendanceHours.toFixed(2);
    weeklyAttendance.push({
      dayOfWeek: day,
      totalAttendanceHours: parseFloat(totalAttendanceHoursFixed),
      firstCheckIn: dailyAttendance.firstCheckIn,
      lastCheckOut: dailyAttendance.lastCheckOut,
      lateMinutes: dailyAttendance.lateMinutes,
    });
  });

  return weeklyAttendance;
}

export async function fetchAttendanceRecords(
  userId: string,
  timestamp: string,
  collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>,
  type: 'weekly' | 'daily'
): Promise<Attendance[]> {
  let from: Date;
  let to: Date;
  if (type === 'weekly') {
    from = moment(timestamp).weekday(0).toDate();
    to = moment(timestamp).weekday(5).toDate();
    console.log(from, to, 'CHECKWeekly');
  } else {
    from = moment(timestamp).add(1, 'days').toDate();
    to = moment(timestamp).add(2, 'days').toDate();
    console.log(from, to, 'CHECKDAILY');
  }

  const query = collection
    .where('user_id', '==', userId)
    .where('created_at', '>=', from)
    .where('created_at', '<', to);
  const snapshot = await query.get();
  const attendanceRecords: Attendance[] = [];
  snapshot.forEach((doc) => {
    const created_at = convertDate(doc.data().created_at);
    attendanceRecords.push({
      id: doc.id,
      ...doc.data(),
      created_at,
    } as Attendance);
  });
  return attendanceRecords;
}

function calculateLateMinutes(checkInTime: Date): number {
  const standardCheckInTime = new Date(checkInTime);
  standardCheckInTime.setHours(10, 0, 0); // Assuming the standard check-in time is 10:00 AM
  const diffMilliseconds =
    checkInTime.getTime() - standardCheckInTime.getTime();
  return Math.max(0, Math.floor(diffMilliseconds / (1000 * 60))); // Calculate minutes difference
}
type EmployeeLateInfo = {
  userId: string;
  userName: string;
  lateDays: number;
  averageLateTime: number;
};

export async function getTopLateEmployeesThisMonth(
  fromDate: Date,
  collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>,
  usersCollection: admin.firestore.CollectionReference<admin.firestore.DocumentData>
): Promise<EmployeeLateInfo[]> {
  // Fetch attendance records for this month
  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(fromDate);
  const query = collection
    .where('created_at', '>=', firstDay)
    .where('created_at', '<', lastDay);
  const snapshot = await query.get();

  const userLateInfoMap: {
    [userId: string]: { lateDays: number; totalLateTime: number };
  } = {};

  const userFirstCheckInMap: { [userId: string]: Date } = {}; // Track the first check-in for each user

  snapshot.forEach((doc) => {
    const { user_id, created_at } = doc.data();
    const checkInTime = convertDate(created_at); // Convert Firestore Timestamp to JavaScript Date

    // Check if this is the first check-in for the user within the specified time interval
    if (
      !userFirstCheckInMap[user_id] ||
      checkInTime < userFirstCheckInMap[user_id]
    ) {
      userFirstCheckInMap[user_id] = checkInTime; // Update the first check-in time for the user
      const lateMinutes = calculateLateMinutes(checkInTime);
      if (lateMinutes > 10) {
        if (!userLateInfoMap[user_id]) {
          userLateInfoMap[user_id] = { lateDays: 0, totalLateTime: 0 };
        }
        userLateInfoMap[user_id].lateDays++;
        userLateInfoMap[user_id].totalLateTime += lateMinutes;
      }
    }
  });

  // Convert userLateInfoMap to an array of { userId, lateDays }
  const lateInfoArray: EmployeeLateInfo[] = [];
  for (const userId in userLateInfoMap) {
    const { lateDays, totalLateTime } = userLateInfoMap[userId];
    const averageLateTime = lateDays > 0 ? totalLateTime / lateDays : 0;
    lateInfoArray.push({
      userId,
      lateDays,
      averageLateTime,
      userName: '',
    });
  }

  // Sort users by the number of late days
  lateInfoArray.sort((a, b) => b.lateDays - a.lateDays);

  // Return top users with their late information
  const topLateEmployees = lateInfoArray.slice(0, 10);

  // Fetch user names from usersCollection if available
  const employeeNamesObj: { [userId: string]: string } = {};
  const userQuerySnapshot = await usersCollection.get();
  userQuerySnapshot.forEach((doc) => {
    const { userId, userName } = doc.data();
    employeeNamesObj[userId] = userName || 'Unknown';
  });

  // Assign user names to late employees and return the final result
  const result: EmployeeLateInfo[] = topLateEmployees.map((employee) => ({
    userId: employee.userId,
    userName: employeeNamesObj[employee.userId],
    lateDays: employee.lateDays,
    averageLateTime: employee.averageLateTime,
  }));
  return result;
}

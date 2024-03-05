type OneDay = {
  totalAttendanceHours: number;
  firstCheckIn: Date | null;
  lastCheckOut: Date | null;
};

export function calculateAttendance(
  records: Attendance[],
  targetDate: Date
): OneDay {
  const filteredRecords = records.filter((record) => {
    const recordDate = record.created_at;
    return (
      recordDate.getFullYear() === targetDate.getFullYear() &&
      recordDate.getMonth() === targetDate.getMonth() &&
      recordDate.getDate() === targetDate.getDate()
    );
  });

  const sortedRecords = filteredRecords.sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  let totalAttendanceMilliseconds = 0;
  let firstCheckIn: Date | null = null;
  let lastCheckOut: Date | null = null;
  let lastCheckInTime: Date | null = null;

  sortedRecords.forEach((record) => {
    if (record.check_in) {
      if (!firstCheckIn) firstCheckIn = record.timestamp;
      lastCheckInTime = record.timestamp;
    } else if (lastCheckInTime) {
      totalAttendanceMilliseconds +=
        record.timestamp.getTime() - lastCheckInTime.getTime();
      lastCheckOut = record.timestamp;
      lastCheckInTime = null;
    }
  });

  const totalAttendanceHours = totalAttendanceMilliseconds / (1000 * 60 * 60);

  return {
    totalAttendanceHours,
    firstCheckIn,
    lastCheckOut,
  };
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDate(date: any) {
  return new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
}

export function formatTime(time: number) {
  const totalHours = Math.floor(time);
  const decimalPart = time - totalHours;
  const totalMinutes = Math.round(decimalPart * 60);
  let formattedTime;
  if (time === 0) {
    formattedTime = 'N/A';
  } else {
    formattedTime = `${totalHours}:${
      totalMinutes < 10 ? '0' : ''
    }${totalMinutes} hours`;
  }
  return formattedTime;
}

export function getMonday(d: Date) {
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export function getFirstAndLastDayOfMonth(date: Date): {
  firstDay: Date;
  lastDay: Date;
} {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);

  const lastDay = new Date(year, month + 1, 0);

  return { firstDay, lastDay };
}

'use client';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  CalendarDaysIcon,
  ClockIcon,
  LogInIcon,
  LogOutIcon,
} from 'lucide-react';
import { RouterOutputs } from '@/trpc/shared';
import { cn, formatTime } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';

type Props = {
  dailyAtt: RouterOutputs['employees']['getEmployee']['dailyAtt'];
  dailyDate: Date;
  setDailyDate: Dispatch<SetStateAction<Date>>;
};

export default function DailyStats({
  dailyAtt,
  dailyDate,
  setDailyDate,
}: Props) {
  return (
    <div className="flex-1">
      <div className="mb-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              // className="w-full justify-start text-left font-normal"
              variant="outline"
              className={cn(
                'w-[280px] md:w-full justify-start text-left font-normal ',
                !dailyDate && 'text-muted-foreground'
              )}
            >
              <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
              {dailyDate ? format(dailyDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              initialFocus
              mode="single"
              selected={dailyDate}
              onSelect={(val) => {
                return val && setDailyDate(val);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm">
                Late:{' '}
                <span className="font-medium">
                  {formatTime(dailyAtt.lateMinutes)}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LogInIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm">
                Check-in:{' '}
                <span className="font-medium">
                  {dailyAtt.firstCheckIn?.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }) || 'N/A'}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LogOutIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm">
                Check-out:{' '}
                <span className="font-medium">
                  {dailyAtt.lastCheckOut?.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }) || 'N/A'}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm">
                Total Work Time:{' '}
                <span className="font-medium">
                  {formatTime(dailyAtt.totalAttendanceHours)}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

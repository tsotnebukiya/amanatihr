'use client';

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RouterOutputs } from '@/trpc/shared';
import {
  CalendarDaysIcon,
  ClockIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react';
import EmployeeChart from './EmployeeChart';
import DailyStats from './DailyStats';
import GeneralInfo from './GeneralInfo';
import EmployeeHeader from './Header';
import { useState } from 'react';
import { api } from '@/trpc/react';
import moment from 'moment';

type EmployeeData = RouterOutputs['employees']['getEmployee'];

export default function EmployeePage({ data }: { data: EmployeeData }) {
  const [weeklyDate, setWeeklyDate] = useState<Date>(new Date());
  const [dailyDate, setDailyDate] = useState<Date>(new Date());
  const { data: queryData } = api.employees.getEmployee.useQuery(
    {
      id: data.employee.id,
      dailyString: moment(dailyDate).toString(),
      weeklyString: moment(weeklyDate).toString(),
    },
    {
      initialData: data,
      enabled: true,
    }
  );
  const { employee, dailyAtt, weeklyAtt } = queryData;
  return (
    <div className="flex flex-col items-center w-full">
      <EmployeeHeader employee={employee} />
      <div className="grid xl:grid-cols-3 gap-6 w-full">
        <div className="xl:col-span-2">
          <EmployeeChart
            weeklyAtt={weeklyAtt}
            weekleyDate={weeklyDate}
            setWeeklyDate={setWeeklyDate}
          />
        </div>
        <div className="flex flex-col gap-3">
          <DailyStats
            dailyAtt={dailyAtt}
            dailyDate={dailyDate}
            setDailyDate={setDailyDate}
          />
          <GeneralInfo employee={employee} />
        </div>
      </div>
    </div>
  );
}

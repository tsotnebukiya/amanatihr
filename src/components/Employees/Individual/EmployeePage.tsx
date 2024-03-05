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

type EmployeeData = RouterOutputs['employees']['getEmployee'];

export default function EmployeePage({ data }: { data: EmployeeData }) {
  const { employee, attendance } = data;
  console.log(attendance);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="User Avatar" src={employee.image_url} />
          <AvatarFallback>
            {employee.name[0]}
            {employee.surname[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold ml-4">
          {employee.name} {employee.surname}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-36 w-full">
        <div className="flex-1">
          <div className="mb-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-start text-left font-normal"
                  variant="outline"
                >
                  <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                  Select a date
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar initialFocus mode="single" />
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
                    Late: <span className="font-medium">No</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LogInIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Check-in: <span className="font-medium">8:00 AM</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LogOutIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Check-out: <span className="font-medium">5:00 PM</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Total Work Time:{' '}
                    <span className="font-medium">9 hours</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>General Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Name: <span className="font-medium">John Doe</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Birthday: <span className="font-medium">01/01/1990</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

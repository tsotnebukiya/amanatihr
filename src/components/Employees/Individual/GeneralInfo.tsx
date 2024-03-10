'use client';

import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { RouterOutputs } from '@/trpc/shared';
import { CalendarDaysIcon, UserIcon } from 'lucide-react';

type Props = {
  employee: RouterOutputs['employees']['getEmployee']['employee'];
};

export default function GeneralInfo({ employee }: Props) {
  const name = employee.name + ' ' + employee.surname;
  const date = employee.birthday.toLocaleDateString();
  return (
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
                Name: <span className="font-medium">{name}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm">
                Birthday: <span className="font-medium">{date}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

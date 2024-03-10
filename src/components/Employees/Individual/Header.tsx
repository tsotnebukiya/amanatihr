'use client';

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { RouterOutputs } from '@/trpc/shared';

type Props = {
  employee: RouterOutputs['employees']['getEmployee']['employee'];
};

export default function EmployeeHeader({ employee }: Props) {
  return (
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
  );
}

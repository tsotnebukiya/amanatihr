import { Search } from 'lucide-react';
import { User } from 'next-auth';
import { Input } from './ui/input';
import { HRTable } from './Admin/HRTable';
import { EmployeesTable } from './Employees/EmployeesTable';

type Props = {
  data: User[] | Employee[];
  type: 'HR' | 'Employee';
};

export default function UserTable({ data, type }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">
          {type === 'HR' ? 'HR Users' : 'Employees'}
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <Input
              className="w-full bg-white shadow-none appearance-none"
              placeholder="Search users..."
              type="search"
            />
          </div>
        </div>
      </div>
      {type === 'HR' && <HRTable hrUsers={data as User[]} />}
      {type === 'Employee' && (
        <EmployeesTable employeeUsers={data as Employee[]} />
      )}
    </>
  );
}

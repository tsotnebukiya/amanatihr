import { Input } from '../ui/input';
import { EmployeesTable } from './EmployeesTable';
import NewEmployeeDrawer from './NewEmployeeDrawer';

export default async function EmployeesPage({ data }: { data: Employee[] }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Employees</h1>

        <div className="flex gap-2">
          <Input
            className="w-full bg-white shadow-none appearance-none"
            placeholder="Search users..."
            type="search"
          />
          <NewEmployeeDrawer />
        </div>
      </div>

      <EmployeesTable employeeUsers={data} />
    </>
  );
}

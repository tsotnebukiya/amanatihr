import EmployeesPage from '@/components/Employees/EmployeesPage';
import { api } from '@/trpc/server';

export default async function Employees() {
  const employees = await api.employees.getEmployees.query();
  return <EmployeesPage data={employees} />;
}

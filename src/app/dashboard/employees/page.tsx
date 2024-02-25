import UserTable from '@/components/UserTable';
import { api } from '@/trpc/server';

export default async function Employees() {
  const employees = await api.employees.getEmployees.query();
  return <UserTable data={employees} type="Employee" />;
}

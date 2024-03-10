import EmployeePage from '@/components/Employees/Individual/EmployeePage';
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';

export default async function Employee({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const date = new Date();
  try {
    const employee = await api.employees.getEmployee.query({
      id: slug,
      dailyString: date.toString(),
      weeklyString: date.toString(),
    });
    return <EmployeePage data={employee} />;
  } catch (err) {
    notFound();
  }
}

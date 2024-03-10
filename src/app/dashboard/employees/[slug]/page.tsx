import EmployeePage from '@/components/Employees/Individual/EmployeePage';
import { api } from '@/trpc/server';
import moment from 'moment';
import { notFound } from 'next/navigation';

export default async function Employee({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  try {
    const employee = await api.employees.getEmployee.query({
      id: slug,
    });
    return <EmployeePage data={employee} />;
  } catch (err: any) {
    console.log(err.message);
    notFound();
  }
}

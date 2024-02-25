import UserTable from '@/components/UserTable';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';

export default async function Admin() {
  const session = await getServerAuthSession();
  if (!session?.user.admin) {
    redirect('/dashboard');
  }
  const hrUsers = await api.hr.getHR.query();
  return <UserTable data={hrUsers} type="HR" />;
}

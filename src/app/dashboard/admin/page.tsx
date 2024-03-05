import AdminPage from '@/components/Admin/AdminPage';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';

export default async function Admin() {
  const session = await getServerAuthSession();
  if (!session?.user.admin) {
    redirect('/dashboard');
  }
  const hrUsers = await api.hr.getHR.query();
  return <AdminPage data={hrUsers} />;
}

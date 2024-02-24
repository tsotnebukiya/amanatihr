import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default async function Component() {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect('/dashboard');
  }
  return <AuthForm />;
}

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import Unverified from '@/components/Unverified';
import { User } from 'next-auth';
import { TRPCReactProvider } from '@/trpc/react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect('/sign-in');
  }
  if (!session.user.verified) {
    return <Unverified />;
  }
  return (
    <TRPCReactProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar user={session.user} />
        <div className="flex flex-col flex-1">
          <Navbar user={session.user} />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </TRPCReactProvider>
  );
}

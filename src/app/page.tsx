import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/server';
import { Activity, LogIn, Package } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Package className="h-6 w-6" />
            <span className="">Amanati</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link
            className={cn(buttonVariants({ variant: 'default' }))}
            href="/dashboard"
          >
            <Activity className="w-4 h-4 -translate-x-1" />
            Dashboard
          </Link>
          <Link
            className={cn(buttonVariants({ variant: 'ghost' }))}
            href="/sign-in"
          >
            <LogIn className="w-4 h-4 -translate-x-1" />
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-4 grid place-content-center gap-4 text-center">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="font-bold tracking-tighter text-3xl">
              Welcome to AMANATI HR
            </h1>
          </div>
          <div className="flex w-full justify-center">
            <Link
              className={cn(buttonVariants({ variant: 'outline' }))}
              href="/dashboard"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

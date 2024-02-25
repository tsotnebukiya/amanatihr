'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import {
  CalendarClock,
  Home,
  Package,
  ShieldEllipsis,
  User as UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { User } from 'next-auth';

const links = [
  {
    name: 'Home',
    url: '/dashboard',
    Icon: Home,
    admin: false,
  },
  {
    name: 'Employees',
    url: '/dashboard/employees',
    Icon: UserIcon,
    admin: false,
  },
  {
    name: 'Attendance',
    url: '/dashboard/attendance',
    Icon: CalendarClock,
    admin: false,
  },
  {
    name: 'Admin',
    url: '/dashboard/admin',
    Icon: ShieldEllipsis,
    admin: true,
  },
];

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const filteredLinks = links.filter(
    (link) => !link.admin || (link.admin && user.admin)
  );
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block sticky top-0 h-screen overflow-y-auto">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Package className="h-6 w-6" />
            <span className="">Amanati</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {filteredLinks.map((el) => (
              <Link
                className={cn(
                  buttonVariants({
                    variant: pathname === el.url ? 'secondary' : 'ghost',
                  }),
                  'justify-start gap-3'
                )}
                key={el.name}
                href={el.url}
              >
                <el.Icon className="h-4 w-4" /> {el.name}
              </Link>
            ))}
            {/* <Link
              className="flex items-center gap-3 rounded-lg bg-background px-3 py-2 text-foreground  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/dashboard/"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'justify-start gap-3'
              )}
              href="/dashboard/"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/dashboard/employees"
            >
              <UserIcon className="h-4 w-4" />
              Employees
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/dashboard/attendance"
            >
              <CalendarClock className="h-4 w-4" />
              Attendance
            </Link> */}
          </nav>
        </div>
      </div>
    </div>
  );
}

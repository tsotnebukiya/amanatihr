import { HRTable } from '@/components/Admin/HRTable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import { ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Admin() {
  const session = await getServerAuthSession();
  if (!session?.user.admin) {
    redirect('/dashboard');
  }
  const hrUsers = await api.users.getHR.query();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">HR Users</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8"
              placeholder="Search users..."
              type="search"
            />
          </div>
        </div>
      </div>

      <HRTable hrUsers={hrUsers} />
    </>
  );
}

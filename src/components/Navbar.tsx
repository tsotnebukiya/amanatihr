'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';

export default function Navbar({ user }: { user: User }) {
  return (
    <header className="flex h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 sticky top-0 z-10">
      <div className="w-full">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search"
              type="search"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            id="dropdown"
            size="icon"
            variant="ghost"
          >
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              src={user.image}
              style={{
                aspectRatio: '32/32',
                objectFit: 'cover',
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

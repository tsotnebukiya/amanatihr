import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { ChevronDown, Search } from 'lucide-react';
import { api } from '@/trpc/server';

export default async function Component() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
      </div>
    </>
  );
}

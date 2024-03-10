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
import Dashboard from '@/components/Dashboard/Dashboard';

export default async function Component() {
  const result = await api.employees.getDashboardStats.query();

  return <Dashboard data={result} />;
}

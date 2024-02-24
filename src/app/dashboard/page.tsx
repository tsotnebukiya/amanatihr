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

export default function Component() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-lg" variant="outline">
                Filters
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Filter 1</DropdownMenuItem>
              <DropdownMenuItem>Filter 2</DropdownMenuItem>
              <DropdownMenuItem>Filter 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Position</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <img
                  alt="User 1"
                  className="rounded-full"
                  height={32}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '32/32',
                    objectFit: 'cover',
                  }}
                  width={32}
                />
              </TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Manager</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <img
                  alt="User 2"
                  className="rounded-full"
                  height={32}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '32/32',
                    objectFit: 'cover',
                  }}
                  width={32}
                />
              </TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>54321</TableCell>
              <TableCell>Developer</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

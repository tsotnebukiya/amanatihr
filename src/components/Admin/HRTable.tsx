'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, ShieldCheck, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function getColumns(handleVerify: (id: string) => void) {
  return [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize">
          <div className="flex items-center gap-3">
            <Avatar className="h-7 w-7">
              {/* <AvatarImage alt="image" src={row.getValue('image')} /> */}
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">{row.getValue('name')}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'verified',
      header: 'Verified',
      cell: ({ row }) => {
        const verified = row.getValue('verified');
        return (
          <Badge variant={verified ? 'outline' : 'destructive'}>
            {verified ? 'Verified' : 'Unverified'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'admin',
      header: 'Role',
      cell: ({ row }) => {
        const admin = row.getValue('admin') || false;
        return (
          <div className="flex gap-1">
            {admin ? <ShieldCheck /> : <UserRound />}
            {admin ? 'Admin' : 'HR'}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const id = row.getValue('id') as string;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem onClick={() => handleVerify(id)}>
                Verify
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ] as ColumnDef<User>[];
}
export function HRTable({ hrUsers }: { hrUsers: User[] }) {
  const router = useRouter();
  const { mutate } = api.users.verifyHR.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      router.refresh();
      toast.success('User verified');
    },
  });
  const handleVerify = (id: string) => {
    mutate({ id });
  };
  const data = hrUsers;
  const columns = getColumns(handleVerify);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

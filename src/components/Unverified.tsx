'use client';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

export default function Unverified() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-900 bg-opacity-70" />
      <Card className="w-full max-w-md p-0">
        <CardHeader>
          <CardTitle className="text-warning-500">Unverified</CardTitle>
          <CardDescription>Your account is not yet verified.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mt-8">
            <Button variant={'destructive'} onClick={() => signOut()}>
              Sign Out
            </Button>
            <Link
              href={'/'}
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              Back to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

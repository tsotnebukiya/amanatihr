'use client';

import { RouterOutputs } from '@/trpc/shared';

type Props = {
  data: RouterOutputs['employees']['getDashboardStats'];
};

export default function Dashboard({ data }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
    </div>
  );
}

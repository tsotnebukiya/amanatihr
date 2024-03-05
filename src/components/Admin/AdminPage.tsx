import { Input } from '../ui/input';
import { User } from 'next-auth';
import { HRTable } from './HRTable';

export default async function AdminPage({ data }: { data: User[] }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">HR Users</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Input
              className="w-full bg-white shadow-none appearance-none"
              placeholder="Search users..."
              type="search"
            />
          </div>
        </div>
      </div>
      <HRTable hrUsers={data} />
    </>
  );
}

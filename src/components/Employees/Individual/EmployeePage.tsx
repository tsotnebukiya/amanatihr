import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

export default function EmployeePage({ employee }: { employee: Employee }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="User Avatar" src={employee.image_url} />
          <AvatarFallback>
            {employee.name[0]}
            {employee.surname[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold ml-4">
          {employee.name} {employee.surname}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-36 w-full">
        <div className="flex-1">
          <div className="mb-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-start text-left font-normal"
                  variant="outline"
                >
                  <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                  Select a date
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar initialFocus mode="single" />
              </PopoverContent>
            </Popover>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Late: <span className="font-medium">No</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LogInIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Check-in: <span className="font-medium">8:00 AM</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LogOutIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Check-out: <span className="font-medium">5:00 PM</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Total Work Time:{' '}
                    <span className="font-medium">9 hours</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>General Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Name: <span className="font-medium">John Doe</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm">
                    Birthday: <span className="font-medium">01/01/1990</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LogInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

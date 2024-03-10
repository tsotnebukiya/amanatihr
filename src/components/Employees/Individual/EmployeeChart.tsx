'use client';
import React, { Dispatch, SetStateAction } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { RouterOutputs } from '@/trpc/shared';
import annotationPlugin from 'chartjs-plugin-annotation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const annotation1: {
  type: 'line';
  borderColor: string;
  borderWidth: number;
  scaleID: string;
  value: number;
} = {
  type: 'line',
  borderColor: 'gray',
  borderWidth: 2,
  scaleID: 'y',
  value: 8,
};

export const options = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        title: () => '',
      },
    },
    annotation: {
      annotations: {
        annotation1,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      max: 12,
      min: 0,
      ticks: {
        stepSize: 2,
      },
    },
  },
};

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

type Props = {
  weeklyAtt: RouterOutputs['employees']['getEmployee']['weeklyAtt'];
  weekleyDate: Date;
  setWeeklyDate: Dispatch<SetStateAction<Date>>;
};

export default function EmployeeChart({
  weeklyAtt,
  setWeeklyDate,
  weekleyDate,
}: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Hours',
        data: weeklyAtt.map((el) => el.totalAttendanceHours),
        backgroundColor: (el: any) => {
          return el.raw >= 8 ? 'green' : '#FF7F7F';
        },
      },
    ],
  };
  return (
    <div className="h-full w-full">
      <div className="mb-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                'w-[280px] md:w-full justify-start text-left font-normal ',
                !weekleyDate && 'text-muted-foreground'
              )}
              variant="outline"
            >
              <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
              {weekleyDate ? (
                format(weekleyDate, 'PPP')
              ) : (
                <span>Select a week</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              initialFocus
              mode="single"
              selected={weekleyDate}
              onSelect={(val) => val && setWeeklyDate(val)}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Bar options={options} data={data} />
    </div>
  );
}

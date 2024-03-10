'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { createUserSchema as formSchema } from '@/lib/schemas';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NewEmployeeDrawer() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: new Date(2015, 1, 1),
      email: '',
      name: '',
      password: '',
      surname: '',
    },
  });

  const { mutate, isLoading } = api.employees.createEmployee.useMutation({
    onSuccess: (data) => {
      form.reset();
      toast.success('User created');
      router.push(`/dashboard/employees/${data}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: 'default' }))}>
        Add Employee
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Add Employee</SheetTitle>
          <SheetDescription>
            Fill out form detauls to create new account for an employee.
          </SheetDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="pass" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[280px] justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            fromYear={1960}
                            toYear={2015}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-2 mt-4"
                loading={isLoading}
              >
                Submit
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

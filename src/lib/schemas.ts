import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string({ required_error: 'Name required' }).min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  surname: z.string({ required_error: 'Surname required' }).min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  email: z
    .string({ required_error: 'Email required' })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: z.string({ required_error: 'Password required' }).min(2, {
    message: 'Password must be at least 2 characters.',
  }),
  birthday: z.date({ required_error: 'Birthday required' }),
});

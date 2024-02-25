import { employeesRouter } from './routers/employees';
import { hrRouter } from './routers/hr';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  hr: hrRouter,
  employees: employeesRouter,
});

export type AppRouter = typeof appRouter;

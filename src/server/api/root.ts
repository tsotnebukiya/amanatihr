import { usersRouter } from './routers/users';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;

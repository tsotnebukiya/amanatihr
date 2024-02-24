'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const AuthState = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthState;

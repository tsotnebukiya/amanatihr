'use client';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChromeIcon from './icons/ChromeIcon';
import { signIn } from 'next-auth/react';

export default function AuthForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-8 text-center">
          LOGIN TO AMANATI HR
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <Input
              id="username"
              placeholder="your-email@gmail.com"
              type="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Input id="password" placeholder="Your Password" type="password" />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Checkbox id="remember-me" />
              <label className="ml-2 text-sm font-medium" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <Link className="text-sm" href="#">
              Forgot Password?
            </Link>
          </div>
          <Button variant={'default'} className="w-full mb-4">
            Log In
          </Button>
          <div className="text-center mb-4">or</div>
          <Button
            className="w-full bg-[#3789db] hover:bg-[#3789db]/90"
            onClick={() => signIn('google')}
          >
            <ChromeIcon className="w-4 h-4 mr-2" />
            Login with Google{'\n              '}
          </Button>
        </form>
      </div>
    </div>
  );
}

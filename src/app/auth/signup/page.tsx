'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, companyName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Sign-up failed. Please try again.');
      } else {
        toast.success(data.message || 'Signed up successfully! Please sign in.');
        router.push('/auth/signin'); // Redirect to sign-in page
      }
    } catch (error) {
      console.error('Sign-up submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-8 sm:p-10 space-y-6 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create Your Account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full"
              placeholder="Your Name"
            />
          </div>
          <div>
            <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="mt-1 w-full"
              placeholder="Your Company LLC"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full"
              placeholder="Create a password (min. 6 characters)"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full"
              placeholder="Confirm your password"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 dark:focus:ring-offset-slate-800"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <div className="text-sm text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 
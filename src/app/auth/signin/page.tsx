'use client';

import { useState, useEffect } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch CSRF token for NextAuth.js form submission
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      if (token) {
        setCsrfToken(token);
      }
    };
    fetchCsrfToken();

    // Show error toast if NextAuth returns an error
    const error = searchParams.get('error');
    if (error) {
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error === 'CredentialsSignin') {
        errorMessage = 'Invalid email or password.';
      }
      // You can add more specific error messages based on the error code
      toast.error(errorMessage);
      // Clear the error from the URL to prevent re-showing on refresh
      router.replace('/auth/signin', { scroll: false });
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!csrfToken) {
        toast.error("Could not verify request. Please try refreshing the page.");
        setLoading(false);
        return;
    }

    const result = await signIn('credentials', {
      redirect: false, // We handle redirect manually
      email,
      password,
      // csrfToken, // Credentials provider doesn't typically need CSRF token explicitly passed this way
                   // NextAuth.js handles it with the hidden input if form posts to [...nextauth] endpoint
    });

    if (result?.error) {
      // Error is already handled by the useEffect hook based on URL query param
      // but you could also set a local error state here if preferred.
      // toast.error(result.error === 'CredentialsSignin' ? 'Invalid email or password' : 'Login failed');
      setLoading(false);
    } else if (result?.ok) {
      toast.success('Signed in successfully!');
      router.push('/'); // Redirect to homepage or dashboard
    } else {
        // Should not happen if result.error or result.ok is not set, but as a fallback
        toast.error('An unexpected error occurred during sign in.');
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-8 sm:p-10 space-y-6 w-full max-w-md">
        <div className="text-center">
           <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign In to Your Account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </Label>
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
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full"
              placeholder="Password"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading || !csrfToken}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 dark:focus:ring-offset-slate-800"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className="text-sm text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 
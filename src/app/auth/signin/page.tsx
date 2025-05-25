'use client';

import { useState, useEffect } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}
      >
        {/* Hidden CSRF token input - NextAuth.js might not require this for Credentials if handling submissions via its API route properly */}
        {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
        <h2>Sign In</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <button 
            type="submit" 
            disabled={loading || !csrfToken}
            style={{
                padding: '0.75rem', 
                backgroundColor: (loading || !csrfToken) ? '#ccc' : '#0070f3', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: (loading || !csrfToken) ? 'not-allowed' : 'pointer'
            }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p style={{ margin: 0 }}>
            Don't have an account?{' '}
            <Link href="/auth/signup" legacyBehavior>
              <a style={{ color: '#0070f3', textDecoration: 'underline', cursor: 'pointer' }}>
                Sign Up
              </a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 
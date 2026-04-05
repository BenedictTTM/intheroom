'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = 'intheroomaqthanks';

export default function LogInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // simple frontend-only check
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // mark as logged in (frontend only)
        try {
          localStorage.setItem('intheroom_admin', 'true');
        } catch (e) {
          // ignore
        }
        // show success state briefly before redirecting
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          router.push('/admin');
        }, 900);
      } else {
        setLoading(false);
        setError('Invalid password.');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Image */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-3/5">
        <Image src={'/images/morningstar/Canon%20Canon%20EOS%20R-6720x4480-32889472-1.jpg'} alt="hero" fill className="object-cover" priority />
      </div>

      {/* Form */}
      <div className="flex w-full md:w-1/2 lg:w-2/5 items-center justify-center p-6 sm:p-8 md:p-10 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-2xl md:text-4xl font-serif font-light tracking-tight mb-4">Log in to Your Account</h1>
            <p className="text-base text-amber-700">Enter your details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Email or Phone Number</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Phone Number"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-500 mb-2">Password</label>
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-sm text-gray-500">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
                disabled={loading || success}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {loading ? 'Logging in' : success ? 'Login successful' : ''}
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-md font-medium transition flex items-center justify-center gap-3 ${success ? 'bg-emerald-600 text-white' : 'bg-amber-700 text-white hover:bg-amber-600'}`}
              disabled={loading || success}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              )}

              {success ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                  </svg>
                  <span>Login successful</span>
                </>
              ) : (
                <span>{loading ? 'Logging in...' : 'Log In'}</span>
              )}
            </button>

            <div className="text-right">
              <a className="text-sm text-amber-500 hover:underline">Forgot Password?</a>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div>
            <button className="w-full border border-gray-200 rounded-md py-3 flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" className="inline-block"><path fill="#EA4335" d="M24 9.5c3.54 0 6.34 1.53 8.24 2.8l6.06-5.86C34.64 3.12 30.6 1.5 24 1.5 14.98 1.5 7.02 6.6 3.25 13.7l7.47 5.8C12.9 14.1 17.88 9.5 24 9.5z"/></svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">Don't have an account? <a className="text-blue-600 hover:underline">contact admin</a></p>
        </div>
      </div>

      {/* Mobile image */}
      <div className="relative w-full h-56 mt-4 md:hidden">
        <Image src={'/images/morningstar/Canon%20Canon%20EOS%20R-6720x4480-32889472-1.jpg'} alt="hero" fill className="object-cover rounded-t-md" />
      </div>
    </div>
  );
}
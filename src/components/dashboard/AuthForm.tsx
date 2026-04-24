import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

type AuthMode = 'login' | 'signup' | 'forgot-password';

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const { signIn, signUp, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      if (mode === 'login') {
        const { error: err } = await signIn(email, password);
        if (err) {
          setError(err.message);
        } else {
          window.location.href = '/dashboard';
        }
      } else if (mode === 'signup') {
        const { error: err } = await signUp(email, password, fullName);
        if (err) {
          setError(err.message);
        } else {
          setSuccess('Check your email to confirm your account.');
        }
      } else if (mode === 'forgot-password') {
        const { error: err } = await resetPassword(email);
        if (err) {
          setError(err.message);
        } else {
          setSuccess('Password reset link sent to your email.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const titles: Record<AuthMode, string> = {
    login: 'Sign in to your dashboard',
    signup: 'Create your account',
    'forgot-password': 'Reset your password',
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <a href="/" className="inline-block">
            <span className="text-2xl font-medium text-white">
              Aidxn<span className="text-primary-400">.</span>
            </span>
          </a>
          <h1 className="mt-4 text-xl font-medium text-white">{titles[mode]}</h1>
          {mode === 'signup' && (
            <p className="mt-2 text-sm text-primary-300/70">
              Accounts are created by invitation. Contact Aiden if you need access.
            </p>
          )}
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-6 shadow-xl backdrop-blur-sm sm:p-8"
        >
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400 border border-red-500/20">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400 border border-green-500/20">
              {success}
            </div>
          )}

          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-primary-200">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-primary-500/20 bg-black/50 px-4 py-2.5 text-white placeholder-primary-500/40 outline-none transition focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-primary-200">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-primary-500/20 bg-black/50 px-4 py-2.5 text-white placeholder-primary-500/40 outline-none transition focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30"
                placeholder="you@company.com"
              />
            </div>

            {mode !== 'forgot-password' && (
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-primary-200">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-primary-500/20 bg-black/50 px-4 py-2.5 text-white placeholder-primary-500/40 outline-none transition focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30"
                  placeholder="Min. 8 characters"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign in'
              : mode === 'signup'
              ? 'Create account'
              : 'Send reset link'}
          </button>

          {/* Links */}
          <div className="mt-4 text-center text-sm text-primary-300/60">
            {mode === 'login' && (
              <>
                <a href="/dashboard/forgot-password" className="text-primary-400 transition hover:text-primary-300">
                  Forgot your password?
                </a>
                <span className="mx-2">|</span>
                <a href="/dashboard/signup" className="text-primary-400 transition hover:text-primary-300">
                  Create account
                </a>
              </>
            )}
            {mode === 'signup' && (
              <a href="/dashboard/login" className="text-primary-400 transition hover:text-primary-300">
                Already have an account? Sign in
              </a>
            )}
            {mode === 'forgot-password' && (
              <a href="/dashboard/login" className="text-primary-400 transition hover:text-primary-300">
                Back to sign in
              </a>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-primary-500/40">
          Client portal by Aidxn Design
        </p>
      </div>
    </div>
  );
}

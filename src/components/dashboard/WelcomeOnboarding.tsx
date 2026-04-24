import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

interface WelcomeOnboardingProps {
  onComplete: () => void;
}

export function WelcomeOnboarding({ onComplete }: WelcomeOnboardingProps) {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setSaving(true);
    setError(null);

    try {
      const { error: err } = await updateProfile({
        full_name: fullName.trim(),
        company_name: companyName.trim() || null,
      });

      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }

      onComplete();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {step === 0 && (
          <div className="text-center">
            {/* Welcome graphic */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-600/20">
              <svg className="h-10 w-10 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </div>

            <h1 className="text-3xl font-semibold text-white">
              Welcome to your portal
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-primary-300/60">
              This is your client dashboard where you can track projects, view analytics, and manage invoices — all in one place.
            </p>

            <button
              onClick={() => setStep(1)}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-500"
            >
              Let's get started
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white">Set up your profile</h2>
              <p className="mt-2 text-sm text-primary-300/60">
                Tell us a bit about yourself so we can personalise your experience.
              </p>
            </div>

            <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-6 backdrop-blur-sm">
              {error && (
                <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="onboard-name" className="mb-1.5 block text-sm font-medium text-primary-200">
                    Your name
                  </label>
                  <input
                    id="onboard-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoFocus
                    className="w-full rounded-xl border border-primary-500/20 bg-black/50 px-4 py-2.5 text-white placeholder-primary-500/40 outline-none transition focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label htmlFor="onboard-company" className="mb-1.5 block text-sm font-medium text-primary-200">
                    Company name <span className="text-primary-500/40">(optional)</span>
                  </label>
                  <input
                    id="onboard-company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-xl border border-primary-500/20 bg-black/50 px-4 py-2.5 text-white placeholder-primary-500/40 outline-none transition focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30"
                    placeholder="Your company"
                  />
                </div>

                <div className="rounded-xl border border-primary-500/10 bg-primary-500/5 p-3">
                  <p className="text-xs text-primary-300/50">
                    Signed in as <span className="text-primary-300/80">{user?.email}</span>. You can update these details anytime in Settings.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-primary-400/60 transition hover:text-primary-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={saving || !fullName.trim()}
                  className="flex-1 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? 'Setting up...' : 'Continue to dashboard'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

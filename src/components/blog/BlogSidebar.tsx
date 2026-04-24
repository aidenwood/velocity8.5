import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogSidebar() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [email, setEmail] = useState('');
  const [signupState, setSignupState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [signupMsg, setSignupMsg] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthLoading(false);
    }).catch(() => setAuthLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, Math.round((window.scrollY / docHeight) * 100)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Extract headings from article content
  useEffect(() => {
    const timer = setTimeout(() => {
      const article = document.querySelector('[data-blog-content]') || document.querySelector('section');
      if (!article) return;

      const els = article.querySelectorAll('h2, h3, h4');
      const items: TOCItem[] = [];

      els.forEach((el, i) => {
        if (!el.id) {
          el.id = `section-${i}`;
        }
        items.push({
          id: el.id,
          text: el.textContent?.trim() || '',
          level: parseInt(el.tagName[1]),
        });
      });

      // If no headings found, parse content paragraphs for bold/strong text as section markers
      if (items.length === 0) {
        const contentSlot = article.querySelector('p');
        if (contentSlot) {
          const text = contentSlot.textContent || '';
          const lines = text.split('\n').filter(Boolean);
          // Find lines that look like section headings (short, no period at end)
          let sectionIndex = 0;
          lines.forEach((line) => {
            const trimmed = line.trim();
            if (trimmed.length > 3 && trimmed.length < 80 && !trimmed.endsWith('.') && !trimmed.endsWith(',')) {
              // Check if this looks like a heading (typically a short phrase)
              const words = trimmed.split(' ');
              if (words.length <= 8) {
                const id = `toc-${sectionIndex}`;
                items.push({ id, text: trimmed, level: 3 });
                sectionIndex++;
              }
            }
          });
        }
      }

      setHeadings(items);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Intersection observer for active heading
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  // Track read completion for logged-in users
  useEffect(() => {
    if (progress >= 90 && session) {
      const slug = window.location.pathname;
      supabase
        .from('blog_reads')
        .upsert(
          { user_id: session.user.id, slug, read_at: new Date().toISOString() },
          { onConflict: 'user_id,slug' }
        )
        .then(() => {});
    }
  }, [progress, session]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSignupState('loading');
    setSignupMsg('');

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: crypto.randomUUID().slice(0, 16) + 'Aa1!',
      options: {
        data: { role: 'reader' },
        emailRedirectTo: window.location.href,
      },
    });

    if (error) {
      // If user already exists, try magic link instead
      if (error.message.includes('already')) {
        const { error: magicError } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { emailRedirectTo: window.location.href },
        });
        if (magicError) {
          setSignupState('error');
          setSignupMsg(magicError.message);
        } else {
          setSignupState('success');
          setSignupMsg('Check your email for a login link.');
        }
      } else {
        setSignupState('error');
        setSignupMsg(error.message);
      }
    } else {
      setSignupState('success');
      setSignupMsg('Check your email to confirm your account.');
    }
  };

  return (
    <aside className="sticky top-[5.5rem] hidden h-fit max-h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto lg:block">
      {/* Reading Progress */}
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-primary-400/60 dark:text-primary-400/50">
          <span>Reading progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-primary-200/30 dark:bg-primary-800/30">
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Table of Contents */}
      {headings.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-primary-500/60 dark:text-primary-400/40">
            In this article
          </h4>
          <nav className="flex flex-col gap-0.5">
            {headings.map((h) => (
              <button
                key={h.id}
                onClick={() => scrollTo(h.id)}
                className={`text-left text-[12px] leading-snug rounded px-2 py-1 transition ${
                  h.level > 2 ? 'pl-4' : ''
                } ${
                  activeId === h.id
                    ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium'
                    : 'text-primary-500 dark:text-primary-400/60 hover:text-primary-900 dark:hover:text-primary-200'
                }`}
              >
                {h.text}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Divider */}
      <div className="my-4 h-px bg-primary-200/40 dark:bg-primary-800/30" />

      {/* Auth Section */}
      {authLoading ? (
        <div className="h-24 animate-pulse rounded-xl bg-primary-100/50 dark:bg-primary-900/20" />
      ) : session ? (
        <div className="rounded-xl border border-primary-200/50 dark:border-primary-800/30 bg-primary-50/50 dark:bg-primary-950/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-primary-800 dark:text-primary-200">
                {session.user.email}
              </p>
            </div>
          </div>
          <a
            href="/dashboard"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-[12px] font-semibold text-white transition hover:bg-violet-500"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            Go to Dashboard
          </a>
        </div>
      ) : (
        <div className="rounded-xl border border-primary-200/50 dark:border-primary-800/30 bg-primary-50/50 dark:bg-primary-950/30 p-4">
          <h4 className="text-[13px] font-semibold text-primary-900 dark:text-white mb-1">
            Track your reading
          </h4>
          <p className="text-[11px] text-primary-500 dark:text-primary-400/60 mb-3 leading-relaxed">
            Sign up to save progress, bookmark articles, and access your client dashboard.
          </p>

          {signupState === 'success' ? (
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2 text-[12px] text-green-600 dark:text-green-400">
              {signupMsg}
            </div>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col gap-2">
              {signupState === 'error' && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-[11px] text-red-500 dark:text-red-400">
                  {signupMsg}
                </div>
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full rounded-lg border border-primary-200/60 dark:border-primary-700/40 bg-white dark:bg-black/40 px-3 py-2 text-[12px] text-primary-900 dark:text-white placeholder-primary-400/50 outline-none transition focus:border-violet-400 focus:ring-1 focus:ring-violet-400/30"
              />
              <button
                type="submit"
                disabled={signupState === 'loading'}
                className="w-full rounded-lg bg-violet-600 px-3 py-2 text-[12px] font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
              >
                {signupState === 'loading' ? 'Signing up...' : 'Sign up free'}
              </button>
            </form>
          )}

          <p className="mt-2.5 text-[10px] text-primary-400/50 dark:text-primary-500/40 leading-relaxed">
            Free reader account. Upgrade later for project tracking, analytics, and invoicing.
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="my-4 h-px bg-primary-200/40 dark:bg-primary-800/30" />

      {/* Quick Links */}
      <div>
        <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-primary-500/60 dark:text-primary-400/40">
          Services
        </h4>
        <nav className="flex flex-col gap-0.5">
          {[
            { label: 'Web Design', href: '/web-design' },
            { label: 'Development', href: '/web-development' },
            { label: 'Branding', href: '/graphic-design' },
            { label: 'Marketing', href: '/digital-marketing' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded px-2 py-1 text-[12px] text-primary-500 dark:text-primary-400/60 transition hover:bg-primary-100/50 dark:hover:bg-primary-800/20 hover:text-primary-900 dark:hover:text-primary-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

/**
 * StickySetupSection — Copied from StaffLocationSort/src/components/landing/StickySetupSection.jsx
 *
 * Vertical sticky scroll section with:
 * - Left side: sticky illustration cards that swap on scroll
 * - Right side: numbered timeline steps with scroll-driven progress line
 * - 3 steps: CRM Integration, Filter Config, Trust & Guarantees
 * - Barcode decorative element, scroll-driven fill line
 *
 * All styling is inline (no external CSS required).
 * Dependencies: react, lucide-react (Lock, Shield, Check, ToggleRight, ToggleLeft, Users, Clock, HeartHandshake, Headphones)
 *
 * Usage in Astro: <StickySetupSection client:load />
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Lock, Shield, Check, ToggleRight, ToggleLeft, Users, Clock, HeartHandshake, Headphones } from 'lucide-react';

// ─── Color Tokens ──────────────────────────────────────────────────────────
const COLORS = {
  bg: '#F8F9FC',
  dark: '#03071E',
  orange: '#FF5500',
  blue: '#4E5DB5',
  blueLight: '#6D95F3',
  body: '#64748B',
  muted: '#94A3B8',
  white: '#FFFFFF',
};

// ─── Barcode Decorative Element ────────────────────────────────────────────
function BarcodeDecoration() {
  const bars = [3, 1.5, 4, 1.5, 2, 3.5, 1, 2.5, 4, 1.5, 3, 1, 2, 3.5, 1.5, 4, 2, 1, 3, 1.5];

  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      className="w-24 h-5 opacity-30 mx-auto mb-4"
      aria-hidden="true"
    >
      {bars.map((w, i) => {
        const x = bars.slice(0, i).reduce((sum, bw) => sum + bw + 1.5, 0);
        return (
          <rect
            key={i}
            x={x}
            y={2}
            width={w}
            height={20}
            rx={0.5}
            fill={COLORS.dark}
          />
        );
      })}
    </svg>
  );
}

// ─── Step 1 Illustration: CRM Integration Card ────────────────────────────
function CrmIntegrationCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: COLORS.muted }}
      >
        CRM Integrations
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#F0FDF4' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#16A34A' }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
              </svg>
            </div>
            <span className="font-semibold text-sm" style={{ color: COLORS.dark }}>Pipedrive</span>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}
          >
            Live
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#EFF6FF' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.blue }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="white" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <span className="font-semibold text-sm" style={{ color: COLORS.dark }}>HubSpot</span>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ backgroundColor: '#DBEAFE', color: COLORS.blue }}
          >
            In Development
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#EFF6FF' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.blueLight }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                <path d="M5 16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v8zm2-8h10v8H7V8z" />
                <path d="M9 10h6v2H9z" />
              </svg>
            </div>
            <span className="font-semibold text-sm" style={{ color: COLORS.dark }}>Salesforce</span>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ backgroundColor: '#DBEAFE', color: COLORS.blue }}
          >
            In Development
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium mb-2" style={{ color: COLORS.body }}>
          API Key
        </p>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl border-2"
          style={{ borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' }}
        >
          <Lock className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.blue }} />
          <span className="text-sm font-mono flex-1 truncate" style={{ color: COLORS.muted }}>
            pk_live_••••••••••••••••••••
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}
          >
            AES-256
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 Illustration: Filter Configuration Card ───────────────────────
function FilterConfigCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: COLORS.muted }}
      >
        CRM Filter Setup
      </p>

      <div className="space-y-4 mb-8">
        {[
          { label: 'Leads', active: true, description: 'Incoming lead pipeline filter' },
          { label: 'Bookings', active: true, description: 'Confirmed booking filter' },
          { label: 'Roster', active: false, description: 'Staff availability filter' },
        ].map(({ label, active, description }) => (
          <div
            key={label}
            className="flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300"
            style={{
              borderColor: active ? COLORS.blue : '#E2E8F0',
              backgroundColor: active ? '#F0F1FA' : '#FAFAFA',
            }}
          >
            <div>
              <p className="font-semibold text-sm" style={{ color: active ? COLORS.dark : COLORS.muted }}>
                {label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: COLORS.body }}>
                {description}
              </p>
            </div>
            {active ? (
              <ToggleRight className="w-7 h-7 flex-shrink-0" style={{ color: COLORS.blue }} />
            ) : (
              <ToggleLeft className="w-7 h-7 flex-shrink-0" style={{ color: COLORS.muted }} />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {[
          { text: 'Pipeline stages mapped', done: true },
          { text: 'Custom fields synced', done: true },
          { text: 'Filter logic verified', done: true },
          { text: 'Test sync complete', done: false },
        ].map(({ text, done }) => (
          <div key={text} className="flex items-center gap-3">
            <div
              className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: done ? COLORS.blue : 'transparent',
                border: done ? 'none' : `2px solid ${COLORS.muted}`,
              }}
            >
              {done && <Check className="w-3 h-3 text-white" />}
            </div>
            <span
              className="text-sm"
              style={{ color: done ? COLORS.dark : COLORS.muted }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 3 Illustration: Trust & Guarantee Card ──────────────────────────
function TrustGuaranteeCard() {
  const badges = [
    {
      icon: <Shield className="w-6 h-6" />,
      label: 'AES-256 Encrypted',
      description: 'Bank-grade key encryption',
      color: COLORS.blue,
      bgColor: '#F0F1FA',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: '14-Day Free Trial',
      description: 'Full access, no card required',
      color: '#16A34A',
      bgColor: '#F0FDF4',
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      label: 'No Lock-In',
      description: 'Cancel anytime, keep your data',
      color: COLORS.orange,
      bgColor: '#FFF7ED',
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      label: 'Australian Support',
      description: 'Real people, local timezone',
      color: COLORS.blueLight,
      bgColor: '#EFF6FF',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: COLORS.muted }}
      >
        Your Guarantees
      </p>

      <div className="space-y-4">
        {badges.map(({ icon, label, description, color, bgColor }) => (
          <div
            key={label}
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ backgroundColor: bgColor }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ color, backgroundColor: `${color}18` }}
            >
              {icon}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: COLORS.dark }}>
                {label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: COLORS.body }}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step Data ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: '01',
    title: 'Create Your Account & Link Your CRM',
    body: 'Click to link or paste your API key. We keep it secure with AES-256 encryption.',
    Card: CrmIntegrationCard,
  },
  {
    number: '02',
    title: 'Select Your CRM Filters',
    body: 'Choose filters for leads, bookings, and roster. Docs and Australian support available if needed.',
    Card: FilterConfigCard,
  },
  {
    number: '03',
    title: 'Select Your On-Road Staff',
    body: 'Add your team to the dashboard. Level up your scheduling instantly.',
    Card: TrustGuaranteeCard,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────
export default function StickySetupSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [fillPercent, setFillPercent] = useState(0);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observers = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveStep(index);
          }
        },
        {
          threshold: [0.3, 0.5, 0.7],
          rootMargin: '-30% 0px -30% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const scrolled = viewportHeight - sectionTop;
      const totalScrollable = sectionHeight + viewportHeight;
      const rawPercent = (scrolled / totalScrollable) * 100;
      const clamped = Math.max(0, Math.min(100, rawPercent * 1.6 - 20));

      setFillPercent(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="text-center mb-20 md:mb-28">
          <BarcodeDecoration />
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-6"
            style={{ color: COLORS.muted }}
          >
            How It Works
          </p>
          <h2
            className="font-black leading-[0.95] tracking-tight mb-6"
            style={{
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              color: COLORS.dark,
            }}
          >
            Launch{' '}
            <span style={{ color: COLORS.orange }}>Quickly.</span>
            <br />
            Schedule{' '}
            <span style={{ color: COLORS.orange }}>Smarter.</span>
          </h2>
          <p
            className="text-lg md:text-xl max-w-xl mx-auto"
            style={{ color: COLORS.body }}
          >
            Onboard your team and start optimising routes in record time.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          <div className="hidden md:block md:w-[40%] lg:w-1/2">
            <div
              style={{
                position: 'sticky',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <div className="relative" style={{ minHeight: '420px' }}>
                {STEPS.map(({ Card }, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: activeStep === index ? 1 : 0,
                      transition: 'opacity 400ms ease-in-out',
                      pointerEvents: activeStep === index ? 'auto' : 'none',
                    }}
                  >
                    <Card />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-[60%] lg:w-1/2 relative" ref={timelineRef}>
            <div
              className="absolute hidden md:block"
              style={{
                left: '22px',
                top: '0',
                bottom: '0',
                width: '2px',
                backgroundColor: `${COLORS.blue}30`,
              }}
            />
            <div
              className="absolute hidden md:block"
              style={{
                left: '22px',
                top: '0',
                width: '2px',
                height: `${fillPercent}%`,
                backgroundColor: COLORS.blue,
                transition: 'height 100ms linear',
              }}
            />

            <div className="space-y-0">
              {STEPS.map(({ number, title, body, Card }, index) => {
                const isActive = activeStep === index;

                return (
                  <div
                    key={number}
                    ref={(el) => (stepRefs.current[index] = el)}
                    className="relative min-h-[50vh] md:min-h-[50vh] lg:min-h-[70vh]"
                  >
                    <div className="flex items-start gap-6 pt-12 md:pt-16 lg:pt-24">
                      <div
                        className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-all duration-500 relative z-10"
                        style={{
                          borderColor: COLORS.blue,
                          backgroundColor: isActive ? COLORS.blue : COLORS.bg,
                          color: isActive ? COLORS.white : COLORS.blue,
                        }}
                      >
                        {number}
                      </div>

                      <div className="flex-1 pb-16">
                        <h3
                          className="font-bold transition-all duration-500 mb-3"
                          style={{
                            fontSize: '1.5rem',
                            lineHeight: '1.3',
                            color: isActive ? COLORS.dark : COLORS.muted,
                          }}
                        >
                          {title}
                        </h3>
                        <p
                          className="text-base leading-relaxed transition-all duration-500 max-w-sm"
                          style={{
                            color: isActive ? COLORS.body : COLORS.muted,
                            opacity: isActive ? 1 : 0.6,
                          }}
                        >
                          {body}
                        </p>

                        <div className="mt-8 md:hidden">
                          <Card />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

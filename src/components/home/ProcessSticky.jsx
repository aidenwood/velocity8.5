/**
 * ProcessSticky — TryResponse-inspired sticky scroll process explainer
 *
 * LEFT: sticky illustration that swaps based on active step
 * RIGHT: numbered steps that scroll, active one highlighted
 *
 * Usage: <ProcessSticky client:load />
 */

import React, { useEffect, useRef, useState } from 'react';

// ─── Step Data ─────────────────────────────────────────────────────────────────

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: "We learn about your business, goals, and competitors. No pitch deck, just a conversation about where you are and where you want to be.",
  },
  {
    num: '02',
    title: 'Strategy & Wireframes',
    desc: "We map your site architecture, user flows, and conversion paths before touching a pixel. Every page earns its place.",
  },
  {
    num: '03',
    title: 'Design & Prototype',
    desc: "High-fidelity designs in Figma. You see exactly what you're getting before we build. Revisions happen here, not in code.",
  },
  {
    num: '04',
    title: 'Development',
    desc: "Custom-built on Astro, React, and Tailwind. Fast, accessible, SEO-optimised from day one. No templates, no page builders.",
  },
  {
    num: '05',
    title: 'Launch & Grow',
    desc: "We deploy, monitor, and optimise. Your client dashboard tracks everything — traffic, conversions, revenue. We stick around.",
  },
];

// ─── SVG Illustrations per step (swap on scroll) ──────────────────────────────

function StepIllustration({ activeStep }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ background: '#F8F9FC' }}>
      {steps.map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-500"
          style={{
            opacity: activeStep === i ? 1 : 0,
            transform: activeStep === i ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          }}
        >
          {i === 0 && <DiscoveryIllustration />}
          {i === 1 && <WireframeIllustration />}
          {i === 2 && <DesignIllustration />}
          {i === 3 && <DevelopmentIllustration />}
          {i === 4 && <LaunchIllustration />}
        </div>
      ))}
    </div>
  );
}

function DiscoveryIllustration() {
  return (
    <svg viewBox="0 0 320 220" fill="none" className="w-full h-full">
      {/* Chat window */}
      <rect x="40" y="20" width="240" height="180" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="40" y="20" width="240" height="36" rx="12" fill="#FAFBFE" />
      <circle cx="60" cy="38" r="5" fill="#E2E8F0" />
      <circle cx="76" cy="38" r="5" fill="#E2E8F0" />
      <circle cx="92" cy="38" r="5" fill="#E2E8F0" />
      <rect x="200" y="32" width="60" height="12" rx="6" fill="#8B5CF6" opacity="0.15" />
      {/* Messages */}
      <rect x="60" y="72" width="120" height="24" rx="8" fill="#F1F5F9" />
      <rect x="68" y="80" width="80" height="8" rx="4" fill="#94A3B8" opacity="0.5" />
      <rect x="120" y="108" width="140" height="24" rx="8" fill="#8B5CF6" opacity="0.1" />
      <rect x="128" y="116" width="100" height="8" rx="4" fill="#8B5CF6" opacity="0.4" />
      <rect x="60" y="144" width="100" height="24" rx="8" fill="#F1F5F9" />
      <rect x="68" y="152" width="60" height="8" rx="4" fill="#94A3B8" opacity="0.5" />
      {/* Typing indicator */}
      <circle cx="188" cy="168" r="3" fill="#8B5CF6" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="168" r="3" fill="#8B5CF6" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="212" cy="168" r="3" fill="#8B5CF6" opacity="0.7">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function WireframeIllustration() {
  return (
    <svg viewBox="0 0 320 220" fill="none" className="w-full h-full">
      {/* Browser chrome */}
      <rect x="30" y="15" width="260" height="190" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="30" y="15" width="260" height="28" rx="10" fill="#FAFBFE" />
      <circle cx="48" cy="29" r="4" fill="#FCA5A5" />
      <circle cx="62" cy="29" r="4" fill="#FDE68A" />
      <circle cx="76" cy="29" r="4" fill="#86EFAC" />
      {/* Wireframe blocks */}
      <rect x="46" y="55" width="228" height="28" rx="4" fill="#8B5CF6" opacity="0.08" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="4 2" />
      <rect x="46" y="93" width="108" height="60" rx="4" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="4 2" />
      <rect x="166" y="93" width="108" height="60" rx="4" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="4 2" />
      <rect x="46" y="163" width="228" height="28" rx="4" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="4 2" />
      {/* Flow arrows */}
      <path d="M160 83 L160 93" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrowV)" />
      <path d="M100 153 L100 163" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M220 153 L220 163" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Labels */}
      <rect x="62" y="61" width="40" height="8" rx="2" fill="#8B5CF6" opacity="0.25" />
      <rect x="62" y="105" width="32" height="6" rx="2" fill="#94A3B8" opacity="0.3" />
      <rect x="182" y="105" width="32" height="6" rx="2" fill="#94A3B8" opacity="0.3" />
    </svg>
  );
}

function DesignIllustration() {
  return (
    <svg viewBox="0 0 320 220" fill="none" className="w-full h-full">
      {/* Figma-style frame */}
      <rect x="30" y="15" width="260" height="190" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Left panel */}
      <rect x="30" y="15" width="50" height="190" rx="10" fill="#FAFBFE" />
      <rect x="38" y="50" width="34" height="6" rx="2" fill="#E2E8F0" />
      <rect x="38" y="64" width="34" height="6" rx="2" fill="#8B5CF6" opacity="0.3" />
      <rect x="38" y="78" width="34" height="6" rx="2" fill="#E2E8F0" />
      <rect x="38" y="92" width="34" height="6" rx="2" fill="#E2E8F0" />
      {/* Design canvas */}
      <rect x="92" y="35" width="186" height="28" rx="4" fill="#8B5CF6" opacity="0.12" />
      <rect x="102" y="43" width="60" height="10" rx="3" fill="#8B5CF6" opacity="0.4" />
      {/* Hero mockup */}
      <rect x="92" y="73" width="186" height="80" rx="4" fill="white" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
      <rect x="102" y="83" width="80" height="10" rx="3" fill="#1E1B4B" opacity="0.7" />
      <rect x="102" y="99" width="120" height="6" rx="2" fill="#94A3B8" opacity="0.4" />
      <rect x="102" y="111" width="100" height="6" rx="2" fill="#94A3B8" opacity="0.3" />
      <rect x="102" y="127" width="60" height="16" rx="6" fill="#8B5CF6" opacity="0.8" />
      {/* Color swatches */}
      <circle cx="104" cy="176" r="8" fill="#8B5CF6" />
      <circle cx="126" cy="176" r="8" fill="#06B6D4" />
      <circle cx="148" cy="176" r="8" fill="#1E1B4B" />
      <circle cx="170" cy="176" r="8" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
      {/* Selection handles */}
      <rect x="89" y="70" width="192" height="86" rx="2" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="87" y="68" width="6" height="6" rx="1" fill="#8B5CF6" />
      <rect x="87" y="152" width="6" height="6" rx="1" fill="#8B5CF6" />
      <rect x="277" y="68" width="6" height="6" rx="1" fill="#8B5CF6" />
      <rect x="277" y="152" width="6" height="6" rx="1" fill="#8B5CF6" />
    </svg>
  );
}

function DevelopmentIllustration() {
  return (
    <svg viewBox="0 0 320 220" fill="none" className="w-full h-full">
      {/* Editor window */}
      <rect x="30" y="15" width="260" height="190" rx="10" fill="#1E1B4B" />
      <rect x="30" y="15" width="260" height="28" rx="10" fill="#0F0D2E" />
      <circle cx="48" cy="29" r="4" fill="#FCA5A5" />
      <circle cx="62" cy="29" r="4" fill="#FDE68A" />
      <circle cx="76" cy="29" r="4" fill="#86EFAC" />
      {/* Code lines */}
      <rect x="50" y="56" width="16" height="7" rx="2" fill="#8B5CF6" opacity="0.6" />
      <rect x="72" y="56" width="80" height="7" rx="2" fill="#A78BFA" opacity="0.3" />
      <rect x="64" y="72" width="24" height="7" rx="2" fill="#06B6D4" opacity="0.5" />
      <rect x="94" y="72" width="60" height="7" rx="2" fill="#F8FAFC" opacity="0.15" />
      <rect x="78" y="88" width="40" height="7" rx="2" fill="#FDE68A" opacity="0.4" />
      <rect x="124" y="88" width="80" height="7" rx="2" fill="#F8FAFC" opacity="0.1" />
      <rect x="78" y="104" width="100" height="7" rx="2" fill="#86EFAC" opacity="0.3" />
      <rect x="64" y="120" width="24" height="7" rx="2" fill="#06B6D4" opacity="0.5" />
      <rect x="50" y="136" width="16" height="7" rx="2" fill="#8B5CF6" opacity="0.6" />
      {/* Terminal output */}
      <rect x="50" y="158" width="220" height="1" fill="#8B5CF6" opacity="0.15" />
      <rect x="50" y="168" width="12" height="7" rx="2" fill="#86EFAC" opacity="0.6" />
      <rect x="68" y="168" width="100" height="7" rx="2" fill="#F8FAFC" opacity="0.2" />
      <rect x="50" y="182" width="12" height="7" rx="2" fill="#86EFAC" opacity="0.6" />
      <rect x="68" y="182" width="140" height="7" rx="2" fill="#F8FAFC" opacity="0.15" />
      {/* Cursor blink */}
      <rect x="214" y="182" width="2" height="9" fill="#8B5CF6">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

function LaunchIllustration() {
  return (
    <svg viewBox="0 0 320 220" fill="none" className="w-full h-full">
      {/* Dashboard frame */}
      <rect x="30" y="15" width="260" height="190" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="30" y="15" width="260" height="28" rx="10" fill="#FAFBFE" />
      <rect x="130" y="25" width="100" height="10" rx="5" fill="#F1F5F9" />
      {/* Stat cards */}
      <rect x="46" y="55" width="72" height="44" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />
      <rect x="54" y="63" width="32" height="5" rx="2" fill="#94A3B8" opacity="0.4" />
      <rect x="54" y="76" width="40" height="10" rx="3" fill="#1E1B4B" opacity="0.7" />
      <rect x="126" y="55" width="72" height="44" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />
      <rect x="134" y="63" width="32" height="5" rx="2" fill="#94A3B8" opacity="0.4" />
      <rect x="134" y="76" width="44" height="10" rx="3" fill="#86EFAC" opacity="0.8" />
      <rect x="206" y="55" width="72" height="44" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />
      <rect x="214" y="63" width="32" height="5" rx="2" fill="#94A3B8" opacity="0.4" />
      <rect x="214" y="76" width="36" height="10" rx="3" fill="#8B5CF6" opacity="0.7" />
      {/* Chart */}
      <rect x="46" y="108" width="228" height="85" rx="6" fill="#FAFBFE" />
      <polyline
        points="60,170 90,155 120,160 150,140 180,135 210,120 240,125 260,115"
        stroke="#8B5CF6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M60 170 L90 155 L120 160 L150 140 L180 135 L210 120 L240 125 L260 115 L260 185 L60 185 Z"
        fill="#8B5CF6" opacity="0.06"
      />
      {/* Rocket */}
      <g style={{ transformOrigin: '24px 10px' }}>
        <circle cx="268" cy="50" r="3" fill="#8B5CF6" opacity="0.4">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProcessSticky() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observers = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i);
          }
        },
        { threshold: 0.5, rootMargin: '-20% 0px -30% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#F8F9FC' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#8B5CF6' }}>
          Our Process
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#03071E', letterSpacing: '-0.02em' }}>
          How we work
        </h2>
        <p className="text-base max-w-md mx-auto" style={{ color: '#64748B' }}>
          From discovery to launch in weeks, not months.
        </p>
      </div>

      {/* Two-column sticky layout */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* LEFT: Sticky illustration */}
          <div className="lg:w-[45%]">
            <div className="lg:sticky lg:top-28">
              <StepIllustration activeStep={activeStep} />

              {/* CTA below illustration */}
              <div className="mt-8 hidden lg:block">
                <a
                  href="/book"
                  className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#8B5CF6', boxShadow: '0 4px 14px rgba(139,92,246,0.25)' }}
                >
                  Book a Discovery Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Scrolling steps */}
          <div className="lg:w-[55%] flex flex-col gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={el => stepRefs.current[i] = el}
                className="rounded-2xl border p-6 sm:p-8 transition-all duration-500"
                style={{
                  background: activeStep === i ? 'white' : 'rgba(255,255,255,0.5)',
                  borderColor: activeStep === i ? 'rgba(139,92,246,0.3)' : '#E2E8F0',
                  borderLeftWidth: activeStep === i ? '3px' : '1px',
                  borderLeftColor: activeStep === i ? '#8B5CF6' : '#E2E8F0',
                  boxShadow: activeStep === i ? '0 4px 24px rgba(139,92,246,0.08)' : 'none',
                  opacity: activeStep === i ? 1 : 0.55,
                  transform: activeStep === i ? 'scale(1)' : 'scale(0.98)',
                  minHeight: '160px',
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-bold transition-colors duration-300"
                    style={{
                      borderColor: activeStep === i ? '#8B5CF6' : '#E2E8F0',
                      color: activeStep === i ? '#8B5CF6' : '#94A3B8',
                      background: activeStep === i ? 'rgba(139,92,246,0.06)' : 'transparent',
                    }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1 transition-colors duration-300"
                      style={{ color: activeStep === i ? '#8B5CF6' : '#94A3B8' }}
                    >
                      Step {step.num}
                    </p>
                    <h3
                      className="text-lg sm:text-xl font-bold mb-2 transition-colors duration-300"
                      style={{ color: activeStep === i ? '#03071E' : '#64748B' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed transition-colors duration-300"
                      style={{ color: activeStep === i ? '#475569' : '#94A3B8' }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center lg:hidden">
          <a
            href="/book"
            className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm"
            style={{ backgroundColor: '#8B5CF6', boxShadow: '0 4px 14px rgba(139,92,246,0.25)' }}
          >
            Book a Discovery Call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

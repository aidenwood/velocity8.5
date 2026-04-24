/**
 * HeroAnimatedGrid — Ported from HeroAnimatedMap.jsx for Aidxn Design portfolio
 *
 * Contains:
 * - AnimatedGridBg: SVG circuit-board/web-architecture grid with perspective/skew transforms,
 *   animated connection paths, service nodes with pulse rings, hub node, and floating stat tooltips
 * - TextRoller: Rotating text animation (vertical slide)
 * - SeoPill: Animated category pill with fade transition
 * - HeroSection: Full hero section composing the above
 *
 * All styling is inline (no external CSS required).
 * Dependencies: react, lucide-react (ArrowRight icon)
 *
 * Usage in Astro: <HeroAnimatedGrid client:load />
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// ─── Animated Grid Background (step-by-step connection builder) ─────────────
export function AnimatedGridBg() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1044);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [step, setStep] = useState(0);

  // Aidxn hub node (centre of the network)
  const HQ = { x: 500, y: 300 };

  // Service nodes positioned around the hub
  const stops = [
    { x: 420, y: 450, label: 'Web Design' },
    { x: 680, y: 420, label: 'Development' },
    { x: 720, y: 540, label: 'Branding' },
    { x: 700, y: 160, label: 'Marketing' },
    { x: 400, y: 180, label: 'SEO' },
    { x: 340, y: 360, label: 'Analytics' },
  ];

  // Stat/testimonial tooltips
  const messages = [
    { text: '"+340% organic traffic"', x: 255, y: 410 },
    { text: '"Revenue up 4.2x"', x: 520, y: 385 },
    { text: '"Launched in 2 weeks"', x: 560, y: 505 },
    { text: '"Page 1 in 30 days"', x: 540, y: 125 },
    { text: '"Bounce rate down 62%"', x: 235, y: 145 },
    { text: '"Conversions up 280%"', x: 175, y: 325 },
  ];

  // Right-angle connection paths from hub through each service node
  const routes = [
    { d: `M ${HQ.x} ${HQ.y} L ${HQ.x} 450 L 420 450`, len: 230 },
    { d: 'M 420 450 L 680 450 L 680 420', len: 290 },
    { d: 'M 680 420 L 720 420 L 720 540', len: 160 },
    { d: 'M 720 540 L 720 160 L 700 160', len: 400 },
    { d: 'M 700 160 L 400 160 L 400 180', len: 320 },
    { d: 'M 400 180 L 340 180 L 340 360', len: 240 },
  ];

  // step 0 = reset, 1-6 = each node appears, 7 = hold
  useEffect(() => {
    const delays = [500, 2500, 2500, 2500, 2500, 2500, 2500, 1000];
    const timeout = setTimeout(() => {
      setStep(s => (s >= 7 ? 0 : s + 1));
    }, delays[step]);
    return () => clearTimeout(timeout);
  }, [step]);

  const activeCount = step === 0 ? 0 : Math.min(step, 6);
  const msgIdx = step >= 1 && step <= 6 ? step - 1 : -1;
  const resetting = step === 0;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox={isMobile ? '-250 -200 1400 950' : '-300 -100 1400 950'}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: isMobile
            ? 'perspective(600px) rotateX(36deg) rotateY(-6deg) rotateZ(6deg)'
            : 'perspective(900px) rotateX(48deg) rotateY(-12deg) rotateZ(24deg)',
          transformOrigin: isMobile ? '80% 50%' : '50% 50%',
        }}
      >

        {/* ── Circuit-board grid (primary lines) ── */}
        <g stroke="rgba(139,92,246,0.06)" strokeWidth="1.2" fill="none">
          <line x1="0" y1="60" x2="1000" y2="60" />
          <line x1="0" y1="180" x2="1000" y2="180" />
          <line x1="0" y1="300" x2="1000" y2="300" />
          <line x1="0" y1="420" x2="1000" y2="420" />
          <line x1="0" y1="560" x2="1000" y2="560" />
          <line x1="140" y1="0" x2="140" y2="650" />
          <line x1="310" y1="0" x2="310" y2="650" />
          <line x1="480" y1="0" x2="480" y2="650" />
          <line x1="640" y1="0" x2="640" y2="650" />
          <line x1="800" y1="0" x2="800" y2="650" />
          <line x1="940" y1="0" x2="940" y2="650" />
        </g>
        {/* ── Secondary grid lines ── */}
        <g stroke="rgba(139,92,246,0.04)" strokeWidth="0.7" fill="none">
          <line x1="0" y1="120" x2="1000" y2="120" />
          <line x1="0" y1="240" x2="1000" y2="240" />
          <line x1="0" y1="360" x2="1000" y2="360" />
          <line x1="0" y1="490" x2="1000" y2="490" />
          <line x1="60" y1="0" x2="60" y2="650" />
          <line x1="220" y1="0" x2="220" y2="650" />
          <line x1="390" y1="0" x2="390" y2="650" />
          <line x1="560" y1="0" x2="560" y2="650" />
          <line x1="720" y1="0" x2="720" y2="650" />
          <line x1="870" y1="0" x2="870" y2="650" />
        </g>
        {/* ── Tertiary grid lines ── */}
        <g stroke="rgba(139,92,246,0.02)" strokeWidth="0.5" fill="none">
          <line x1="0" y1="30" x2="1000" y2="30" />
          <line x1="0" y1="90" x2="1000" y2="90" />
          <line x1="0" y1="150" x2="1000" y2="150" />
          <line x1="0" y1="210" x2="1000" y2="210" />
          <line x1="0" y1="270" x2="1000" y2="270" />
          <line x1="0" y1="330" x2="1000" y2="330" />
          <line x1="0" y1="390" x2="1000" y2="390" />
          <line x1="0" y1="450" x2="1000" y2="450" />
          <line x1="0" y1="525" x2="1000" y2="525" />
          <line x1="0" y1="585" x2="1000" y2="585" />
          <line x1="100" y1="0" x2="100" y2="650" />
          <line x1="180" y1="0" x2="180" y2="650" />
          <line x1="265" y1="0" x2="265" y2="650" />
          <line x1="350" y1="0" x2="350" y2="650" />
          <line x1="435" y1="0" x2="435" y2="650" />
          <line x1="520" y1="0" x2="520" y2="650" />
          <line x1="600" y1="0" x2="600" y2="650" />
          <line x1="680" y1="0" x2="680" y2="650" />
          <line x1="760" y1="0" x2="760" y2="650" />
          <line x1="835" y1="0" x2="835" y2="650" />
          <line x1="905" y1="0" x2="905" y2="650" />
        </g>

        {/* ── Diagonal traces (circuit-board style) ── */}
        <g stroke="rgba(139,92,246,0.03)" strokeWidth="0.6" fill="none">
          <line x1="140" y1="60" x2="480" y2="420" />
          <line x1="640" y1="60" x2="940" y2="360" />
          <line x1="310" y1="420" x2="640" y2="560" />
          <line x1="800" y1="180" x2="940" y2="560" />
        </g>

        {/* ── Junction nodes (circuit-board intersections) ── */}
        {[
          { x: 310, y: 180 }, { x: 480, y: 300 }, { x: 640, y: 180 },
          { x: 800, y: 300 }, { x: 310, y: 420 }, { x: 640, y: 420 },
          { x: 480, y: 120 }, { x: 720, y: 490 }, { x: 220, y: 300 },
          { x: 560, y: 560 }, { x: 870, y: 180 }, { x: 940, y: 420 },
        ].map((r, i) => (
          <g key={`jn-${i}`}>
            <circle cx={r.x} cy={r.y} r="8" fill="none" stroke="rgba(139,92,246,0.04)" strokeWidth="0.8" />
            <circle cx={r.x} cy={r.y} r="3.5" fill="none" stroke="rgba(139,92,246,0.025)" strokeWidth="0.5" />
          </g>
        ))}

        {/* ── Progressive connection paths ── */}
        {routes.map((route, i) => (
          <path
            key={`route-${i}`}
            d={route.d}
            fill="none"
            stroke="rgba(139,92,246,0.6)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={route.len}
            style={{
              strokeDashoffset: i < activeCount ? 0 : route.len,
              transition: resetting
                ? 'stroke-dashoffset 0.5s ease-out, opacity 0.5s ease-out'
                : 'stroke-dashoffset 1.8s ease-in-out',
              opacity: resetting ? 0 : (i < activeCount ? 1 : 0),
            }}
          />
        ))}

        {/* ── Service node markers (appear progressively) ── */}
        {stops.map((stop, i) => {
          const visible = i < activeCount && !resetting;
          const isNewest = i === activeCount - 1 && !resetting;
          return (
            <g key={`stop-${i}`}>
              {/* Pulse ring on newest */}
              {isNewest && (
                <circle cx={stop.x} cy={stop.y} r="10" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="2">
                  <animate attributeName="r" from="10" to="30" dur="1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="1s" fill="freeze" />
                </circle>
              )}
              {/* Outer glow */}
              <circle cx={stop.x} cy={stop.y} r="14"
                fill="rgba(139,92,246,0.06)"
                style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }} />
              {/* Ring */}
              <circle cx={stop.x} cy={stop.y} r="9"
                fill="rgba(248,249,252,0.95)"
                stroke="rgba(139,92,246,0.6)"
                strokeWidth="2.5"
                style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }} />
              {/* Centre dot */}
              <circle cx={stop.x} cy={stop.y} r="3.5"
                fill="rgba(255,255,255,0.9)"
                style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }} />
            </g>
          );
        })}

        {/* ── Aidxn hub node ── */}
        <g style={{ opacity: resetting ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
          <ellipse cx={HQ.x} cy={HQ.y + 16} rx="9" ry="3" fill="rgba(0,0,0,0.2)" />
          <path
            d={`M ${HQ.x} ${HQ.y + 13} C ${HQ.x} ${HQ.y + 13} ${HQ.x - 14} ${HQ.y - 5} ${HQ.x - 14} ${HQ.y - 14} C ${HQ.x - 14} ${HQ.y - 23} ${HQ.x - 8} ${HQ.y - 29} ${HQ.x} ${HQ.y - 29} C ${HQ.x + 8} ${HQ.y - 29} ${HQ.x + 14} ${HQ.y - 23} ${HQ.x + 14} ${HQ.y - 14} C ${HQ.x + 14} ${HQ.y - 5} ${HQ.x} ${HQ.y + 13} ${HQ.x} ${HQ.y + 13} Z`}
            fill="rgba(15,20,30,0.95)" stroke="rgba(139,92,246,0.7)" strokeWidth="2"
          />
          <circle cx={HQ.x} cy={HQ.y - 14} r="4" fill="rgba(139,92,246,0.4)" />
        </g>

        {/* ── Stat/testimonial tooltips ── */}
        {messages.map((msg, i) => (
          <foreignObject
            key={`msg-${i}`}
            x={msg.x} y={msg.y}
            width="170" height="50"
            style={{
              opacity: msgIdx === i ? 1 : 0,
              transition: 'opacity 0.6s ease',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              background: 'rgba(20,25,35,0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '10px',
              lineHeight: '1.45',
              color: 'rgba(196,181,253,0.9)',
              fontStyle: 'italic',
              fontFamily: 'system-ui, sans-serif',
            }}>
              {msg.text}
            </div>
          </foreignObject>
        ))}
      </svg>

      {/* Subtle lighten behind hero text (top-left corner only) */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 15% 25%, rgba(248,249,252,0.95) 0%, rgba(248,249,252,0.6) 30%, transparent 60%)',
      }} />
    </div>
  );
}

// ─── Hero Slides Data ────────────────────────────────────────────────────────
export const heroSlides = [
  { text: 'template websites to custom-built platforms', pill: 'Custom web design Gold Coast' },
  { text: 'zero online presence to page-one rankings', pill: 'Conversion-focused development' },
  { text: 'slow loading pages to sub-second speeds', pill: 'Brand identity & strategy' },
  { text: 'low conversions to optimised funnels', pill: 'SEO & digital marketing' },
  { text: 'scattered branding to cohesive identity', pill: 'SaaS & internal tools' },
  { text: 'manual processes to automated workflows', pill: 'E-commerce solutions' },
  { text: 'outdated design to modern experiences', pill: 'Creative coding & 3D' },
  { text: 'guesswork marketing to data-driven growth', pill: 'Data-driven marketing' },
];

export function useHeroIndex() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % heroSlides.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return index;
}

export function TextRoller({ index }) {
  return (
    <span
      className="inline-block h-[1.15em] overflow-hidden align-bottom"
      aria-label={heroSlides.map(s => s.text).join(', ')}
    >
      <span
        className="inline-flex flex-col transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${index * (100 / heroSlides.length)}%)` }}
      >
        {heroSlides.map((slide, i) => (
          <span key={i} className="h-[1.15em] flex items-center whitespace-nowrap" style={{ color: '#8B5CF6' }}>
            {slide.text}
          </span>
        ))}
      </span>
    </span>
  );
}

export function SeoPill({ index }) {
  const [displayIdx, setDisplayIdx] = useState(index);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayIdx(index);
      setVisible(true);
    }, 350);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <span
      className="inline-flex items-center gap-1.5 border rounded-full px-3.5 py-1 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, backgroundColor: 'rgba(139,92,246,0.06)', borderColor: 'rgba(139,92,246,0.15)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8B5CF6' }} />
      <span className="text-xs" style={{ color: '#64748B' }}>{heroSlides[displayIdx].pill}</span>
    </span>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
export default function HeroAnimatedGrid() {
  const heroIndex = useHeroIndex();

  return (
    <section className="relative h-screen flex items-start overflow-hidden" style={{ backgroundColor: '#F8F9FC' }}>
      <AnimatedGridBg />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-20">
        <div className="max-w-2xl">
          <div className="mb-6">
            <SeoPill index={heroIndex} />
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6" style={{ color: '#03071E' }}>
            Your business goes from<br />
            <TextRoller index={heroIndex} />
          </h1>

          <p className="text-[10px] md:text-xs max-w-xs mb-10 leading-relaxed" style={{ color: '#94A3B8' }}>
            Aidxn Design builds custom websites, brands, and digital systems that turn visitors into customers and chaos into clarity.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/book"
              className="text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg flex items-center gap-2 text-sm"
              style={{ backgroundColor: '#8B5CF6', boxShadow: '0 4px 14px rgba(139,92,246,0.25)' }}
            >
              Book a Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[7px] md:text-xs mt-4" style={{ color: '#94A3B8' }}>Free discovery call. No obligation.</p>
        </div>
      </div>
    </section>
  );
}

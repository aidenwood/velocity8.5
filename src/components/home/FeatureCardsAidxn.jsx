/**
 * FeatureCardsAidxn — Ported from FeatureCards.jsx for Aidxn Design web agency portfolio.
 *
 * 3-column horizontal card grid with animated SVG illustrations.
 * Three sections: Design, Develop, Grow — each with 3 animated sub-cards.
 *
 * All styling is inline (no external CSS required).
 * Dependencies: react
 *
 * Usage in Astro: <FeatureCardsAidxn client:load />
 */

import React, { useEffect, useRef, useState } from 'react';

// ─── Intersection Observer Hook ─────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold]);

  return [ref, inView];
}

// ─── Animated wrapper for fade-in + translateY ──────────────────────────────
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView(0.15);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section Icon Components ────────────────────────────────────────────────
function DesignIcon() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      border: '1.5px solid #E2E8F0', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#fff',
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="11" rx="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
        <line x1="2" y1="7" x2="18" y2="7" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        <circle cx="5" cy="5" r="1" fill="#8B5CF6" opacity="0.6" />
        <circle cx="8" cy="5" r="1" fill="#8B5CF6" opacity="0.4" />
        <circle cx="11" cy="5" r="1" fill="#8B5CF6" opacity="0.3" />
        <rect x="7" y="16" width="6" height="1.5" rx="0.75" fill="#8B5CF6" opacity="0.5" />
      </svg>
    </div>
  );
}

function CodeIcon() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      border: '1.5px solid #E2E8F0', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#fff',
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 5L2.5 10L7 15" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 5L17.5 10L13 15" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="11" y1="3" x2="9" y2="17" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

function GrowthIcon() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      border: '1.5px solid #E2E8F0', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#fff',
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="12" width="3" height="6" rx="1" fill="#8B5CF6" opacity="0.4" />
        <rect x="7" y="8" width="3" height="10" rx="1" fill="#8B5CF6" opacity="0.7" />
        <rect x="12" y="4" width="3" height="14" rx="1" fill="#8B5CF6" />
        <path d="M3.5 11L8.5 7L13.5 3" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 3H14V6" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── SVG Animation: Custom Layouts (wireframe grid assembling, looping) ─────
function CustomLayoutsAnimation({ active }) {
  const rows = [0, 1, 2, 3, 4];
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }
    let timer;
    function cycle() {
      setPhase(1);
      timer = setTimeout(() => {
        setPhase(2);
        timer = setTimeout(() => {
          setPhase(3);
          timer = setTimeout(() => {
            setPhase(0);
            timer = setTimeout(cycle, 200);
          }, 700);
        }, 1200);
      }, 800);
    }
    cycle();
    return () => clearTimeout(timer);
  }, [active]);

  const isVisible = phase === 1 || phase === 2;
  const isSlidingOut = phase === 3;

  // Wireframe layout blocks instead of data rows
  const blocks = [
    { x: 20, y: 16, w: 200, h: 24, inner: [{ x: 24, y: 20, w: 60, h: 16 }, { x: 90, y: 20, w: 130, h: 16 }] },
    { x: 20, y: 46, w: 96, h: 44, inner: [{ x: 24, y: 50, w: 88, h: 36 }] },
    { x: 122, y: 46, w: 98, h: 44, inner: [{ x: 126, y: 50, w: 90, h: 36 }] },
    { x: 20, y: 96, w: 60, h: 30, inner: [{ x: 24, y: 100, w: 52, h: 22 }] },
    { x: 86, y: 96, w: 60, h: 30, inner: [{ x: 90, y: 100, w: 52, h: 22 }] },
  ];

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .layout-block { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      {blocks.map((b, i) => (
        <g key={i}
          className="layout-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translateX(0)'
              : isSlidingOut
                ? 'translateX(40px)'
                : 'translateX(-40px)',
            transition: isVisible
              ? `opacity 500ms ease-out ${i * 100}ms, transform 500ms ease-out ${i * 100}ms`
              : `opacity 400ms ease-in ${(4 - i) * 80}ms, transform 400ms ease-in ${(4 - i) * 80}ms`,
          }}
        >
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5" />
          {b.inner.map((inner, j) => (
            <rect key={j} x={inner.x} y={inner.y} width={inner.w} height={inner.h} rx="3" fill="#8B5CF6"
              style={{
                opacity: isVisible ? (j === 0 ? 0.15 : 0.1) : 0,
                transition: isVisible
                  ? `opacity 400ms ease-out ${i * 100 + 200}ms`
                  : `opacity 300ms ease-in ${(4 - i) * 80}ms`,
              }}
            />
          ))}
          {/* Content lines inside blocks */}
          {b.h > 30 && (
            <>
              <rect x={b.x + 8} y={b.y + 8} width={b.w * 0.5} height="3" rx="1.5" fill="#8B5CF6"
                style={{
                  opacity: isVisible ? 0.4 : 0,
                  transition: isVisible
                    ? `opacity 400ms ease-out ${i * 100 + 300}ms`
                    : `opacity 300ms ease-in ${(4 - i) * 80}ms`,
                }}
              />
              <rect x={b.x + 8} y={b.y + 14} width={b.w * 0.35} height="3" rx="1.5" fill="#A78BFA"
                style={{
                  opacity: isVisible ? 0.3 : 0,
                  transition: isVisible
                    ? `opacity 400ms ease-out ${i * 100 + 400}ms`
                    : `opacity 300ms ease-in ${(4 - i) * 80}ms`,
                }}
              />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

// ─── SVG Animation: Responsive Design (layout adapting between viewports) ───
function ResponsiveDesignAnimation({ active }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    let timer;
    function cycle() {
      setStep(1);
      timer = setTimeout(() => {
        setStep(2);
        timer = setTimeout(() => {
          setStep(3);
          timer = setTimeout(() => {
            setStep(4);
            timer = setTimeout(() => {
              setStep(0);
              timer = setTimeout(cycle, 300);
            }, 600);
          }, 1800);
        }, 900);
      }, 500);
    }
    cycle();
    return () => clearTimeout(timer);
  }, [active]);

  const nodesVisible = step >= 1 && step <= 3;
  const lineDrawn = step >= 2 && step <= 3;
  const showPulse = step === 3;
  const fadingOut = step === 4;

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @keyframes resp-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .resp-device { opacity: 1 !important; }
          .resp-line { opacity: 1 !important; }
          .resp-pulse-dot { animation: none !important; opacity: 0.6 !important; }
        }
      `}</style>
      {/* Desktop */}
      <g className="resp-device" style={{
        opacity: nodesVisible ? 1 : fadingOut ? 0 : 0,
        transition: nodesVisible ? 'opacity 400ms ease-out' : 'opacity 500ms ease-in',
      }}>
        <rect x="14" y="34" width="70" height="50" rx="4" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="18" y="38" width="62" height="34" rx="2" fill="#fff" />
        <rect x="22" y="42" width="20" height="3" rx="1.5" fill="#8B5CF6" opacity="0.6" />
        <rect x="22" y="48" width="54" height="3" rx="1.5" fill="#8B5CF6" opacity="0.3" />
        <rect x="22" y="54" width="26" height="12" rx="2" fill="#8B5CF6" opacity="0.15" />
        <rect x="52" y="54" width="26" height="12" rx="2" fill="#A78BFA" opacity="0.15" />
        <rect x="36" y="84" width="26" height="3" rx="1.5" fill="#CBD5E1" />
        <text x="49" y="94" textAnchor="middle" fill="#94A3B8" fontSize="6" fontWeight="500">Desktop</text>
      </g>
      {/* Tablet */}
      <g className="resp-device" style={{
        opacity: nodesVisible ? 1 : fadingOut ? 0 : 0,
        transition: nodesVisible ? 'opacity 400ms ease-out 100ms' : 'opacity 500ms ease-in 50ms',
      }}>
        <rect x="100" y="38" width="40" height="54" rx="4" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="104" y="42" width="32" height="40" rx="2" fill="#fff" />
        <rect x="107" y="46" width="16" height="3" rx="1.5" fill="#8B5CF6" opacity="0.6" />
        <rect x="107" y="52" width="26" height="3" rx="1.5" fill="#8B5CF6" opacity="0.3" />
        <rect x="107" y="58" width="26" height="18" rx="2" fill="#8B5CF6" opacity="0.15" />
        <circle cx="120" cy="88" r="2" fill="#CBD5E1" />
        <text x="120" y="100" textAnchor="middle" fill="#94A3B8" fontSize="6" fontWeight="500">Tablet</text>
      </g>
      {/* Mobile */}
      <g className="resp-device" style={{
        opacity: nodesVisible ? 1 : fadingOut ? 0 : 0,
        transition: nodesVisible ? 'opacity 400ms ease-out 200ms' : 'opacity 500ms ease-in 100ms',
      }}>
        <rect x="160" y="42" width="28" height="48" rx="4" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="163" y="46" width="22" height="34" rx="2" fill="#fff" />
        <rect x="166" y="50" width="12" height="2" rx="1" fill="#8B5CF6" opacity="0.6" />
        <rect x="166" y="54" width="16" height="2" rx="1" fill="#8B5CF6" opacity="0.3" />
        <rect x="166" y="58" width="16" height="16" rx="2" fill="#8B5CF6" opacity="0.15" />
        <circle cx="174" cy="85" r="2" fill="#CBD5E1" />
        <text x="174" y="100" textAnchor="middle" fill="#94A3B8" fontSize="6" fontWeight="500">Mobile</text>
      </g>
      {/* Connection arrows */}
      <line x1="84" y1="60" x2="100" y2="60" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"
        className="resp-line"
        style={{
          strokeDasharray: 16,
          strokeDashoffset: lineDrawn ? 0 : 16,
          opacity: fadingOut ? 0 : 1,
          transition: lineDrawn
            ? 'stroke-dashoffset 600ms ease-out, opacity 500ms ease-in'
            : 'stroke-dashoffset 0ms, opacity 500ms ease-in',
        }}
      />
      <line x1="140" y1="60" x2="160" y2="60" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"
        className="resp-line"
        style={{
          strokeDasharray: 20,
          strokeDashoffset: lineDrawn ? 0 : 20,
          opacity: fadingOut ? 0 : 1,
          transition: lineDrawn
            ? 'stroke-dashoffset 600ms ease-out 200ms, opacity 500ms ease-in'
            : 'stroke-dashoffset 0ms, opacity 500ms ease-in',
        }}
      />
      {showPulse && [0, 1].map((i) => (
        <circle key={i} cx={i === 0 ? 92 : 150} cy="60" r="3" fill="#FF5500"
          className="resp-pulse-dot"
          style={{ animation: `resp-pulse 1.5s ease-in-out ${i * 200}ms infinite` }}
        />
      ))}
    </svg>
  );
}

// ─── SVG Animation: Brand Systems (color swatches + typography organizing) ──
function BrandSystemsAnimation({ active }) {
  const scattered = [
    { x: 40, y: 20 }, { x: 180, y: 35 }, { x: 100, y: 110 },
    { x: 200, y: 90 }, { x: 60, y: 80 }, { x: 150, y: 15 },
    { x: 30, y: 105 }, { x: 170, y: 65 }, { x: 90, y: 50 },
  ];
  const organized = [
    { x: 48, y: 28 }, { x: 96, y: 28 }, { x: 144, y: 28 },
    { x: 48, y: 60 }, { x: 96, y: 60 }, { x: 144, y: 60 },
    { x: 48, y: 92 }, { x: 96, y: 92 }, { x: 144, y: 92 },
  ];
  const colors = ['#8B5CF6', '#A78BFA', '#FF5500', '#8B5CF6', '#C4B5FD', '#7C3AED', '#FF5500', '#A78BFA', '#8B5CF6'];

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }
    let timer;
    function cycle() {
      setPhase(1);
      timer = setTimeout(() => {
        setPhase(2);
        timer = setTimeout(() => {
          setPhase(3);
          timer = setTimeout(() => {
            setPhase(0);
            timer = setTimeout(cycle, 400);
          }, 800);
        }, 1200);
      }, 800);
    }
    cycle();
    return () => clearTimeout(timer);
  }, [active]);

  const isOrganized = phase === 1 || phase === 2;

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .brand-swatch { opacity: 1 !important; }
        }
      `}</style>
      {/* Grid lines appear when organized */}
      {[28, 60, 92].map((y) => (
        <line key={`h-${y}`} x1="36" y1={y} x2="156" y2={y}
          stroke="#E2E8F0" strokeWidth="0.5"
          style={{
            opacity: isOrganized ? 0.6 : 0,
            transition: isOrganized ? 'opacity 600ms ease-out 400ms' : 'opacity 400ms ease-in',
          }}
        />
      ))}
      {[48, 96, 144].map((x) => (
        <line key={`v-${x}`} x1={x} y1="16" x2={x} y2="104"
          stroke="#E2E8F0" strokeWidth="0.5"
          style={{
            opacity: isOrganized ? 0.6 : 0,
            transition: isOrganized ? 'opacity 600ms ease-out 400ms' : 'opacity 400ms ease-in',
          }}
        />
      ))}
      {scattered.map((s, i) => {
        const t = organized[i];
        const isCircle = i % 3 === 0;
        return (
          <g key={i}>
            {/* Background glow */}
            <rect
              className="brand-swatch"
              x={(isOrganized ? t.x : s.x) - 10}
              y={(isOrganized ? t.y : s.y) - 10}
              width="20" height="20" rx={isCircle ? 10 : 5}
              fill={colors[i]} opacity={isOrganized ? 0.2 : 0.15}
              style={{
                transition: isOrganized
                  ? `all 700ms ease-out ${i * 80}ms`
                  : `all 600ms ease-in-out ${i * 60}ms`,
              }}
            />
            {/* Core swatch */}
            <rect
              className="brand-swatch"
              x={(isOrganized ? t.x : s.x) - 5}
              y={(isOrganized ? t.y : s.y) - 5}
              width="10" height="10" rx={isCircle ? 5 : 3}
              fill={colors[i]} opacity={isOrganized ? 0.7 : 0.3}
              style={{
                transition: isOrganized
                  ? `all 700ms ease-out ${i * 80}ms`
                  : `all 600ms ease-in-out ${i * 60}ms`,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}

// ─── SVG Animation: Performance First (speed gauge / loading bar) ───────────
function PerformanceAnimation({ active }) {
  const pins = [
    { x: 40, y: 100 },
    { x: 80, y: 40 },
    { x: 130, y: 80 },
    { x: 175, y: 30 },
    { x: 210, y: 95 },
  ];
  // Speed metric visualization: line climbing up = performance improving
  const pathD = `M30,110 L70,90 L110,70 L150,40 L190,25 L220,20`;
  const pathLength = 380;

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setPhase(3); return; }

    const timers = [];
    function runCycle() {
      setPhase(1);
      const schedule = [
        { delay: 700, next: 2 },
        { delay: 1300, next: 3 },
        { delay: 1000, next: 4 },
        { delay: 900, next: 5 },
        { delay: 600, next: 0 },
      ];
      let accum = 0;
      schedule.forEach((s, i) => {
        accum += s.delay;
        const t = setTimeout(() => {
          setPhase(s.next);
          if (i === schedule.length - 1) {
            const restart = setTimeout(runCycle, 200);
            timers.push(restart);
          }
        }, accum);
        timers.push(t);
      });
    }
    runCycle();
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const pinsVisible = phase >= 1 && phase <= 4;
  const routeDrawn = phase === 2 || phase === 3;
  const routeUndrawing = phase === 4;

  const metrics = [
    { x: 40, y: 100, label: '1.2s' },
    { x: 80, y: 40, label: '0.8s' },
    { x: 130, y: 80, label: '0.5s' },
    { x: 175, y: 30, label: '0.3s' },
    { x: 210, y: 95, label: '0.2s' },
  ];

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .perf-path { stroke-dashoffset: 0 !important; }
          .perf-pin { opacity: 1 !important; }
        }
      `}</style>
      {/* Grid */}
      {[20, 40, 60, 80, 100, 120].map((y) => (
        <line key={`g-${y}`} x1="10" y1={y} x2="230" y2={y} stroke="#E2E8F0" strokeWidth="0.5" opacity="0.4" />
      ))}
      {[30, 60, 90, 120, 150, 180, 210].map((x) => (
        <line key={`g-${x}`} x1={x} y1="10" x2={x} y2="130" stroke="#E2E8F0" strokeWidth="0.5" opacity="0.4" />
      ))}
      {/* Performance line */}
      <path d={pathD} stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className="perf-path"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: routeDrawn ? 0 : pathLength,
          transition: routeDrawn
            ? 'stroke-dashoffset 1200ms ease-in-out'
            : routeUndrawing
              ? 'stroke-dashoffset 800ms ease-in-out'
              : 'none',
        }}
      />
      {/* Data points */}
      {metrics.map((p, i) => (
        <g key={i} className="perf-pin" style={{
          opacity: pinsVisible ? 1 : 0,
          transition: pinsVisible
            ? `opacity 300ms ease-out ${i * 100}ms`
            : 'opacity 400ms ease-in-out',
        }}>
          <circle cx={p.x} cy={p.y} r="8" fill="#8B5CF6" opacity="0.15" />
          <circle cx={p.x} cy={p.y} r="4.5" fill={i === metrics.length - 1 ? '#FF5500' : '#8B5CF6'} />
          <circle cx={p.x} cy={p.y} r="2" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

// ─── SVG Animation: API Integration (two services connecting, looping) ──────
function ApiIntegrationAnimation({ active }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    let timer;
    function cycle() {
      setStep(1);
      timer = setTimeout(() => {
        setStep(2);
        timer = setTimeout(() => {
          setStep(3);
          timer = setTimeout(() => {
            setStep(4);
            timer = setTimeout(() => {
              setStep(0);
              timer = setTimeout(cycle, 300);
            }, 600);
          }, 1800);
        }, 900);
      }, 500);
    }
    cycle();
    return () => clearTimeout(timer);
  }, [active]);

  const nodesVisible = step >= 1 && step <= 3;
  const lineDrawn = step >= 2 && step <= 3;
  const showPulse = step === 3;
  const fadingOut = step === 4;

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @keyframes api-int-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .api-int-line, .api-int-node { opacity: 1 !important; }
          .api-int-pulse-dot { animation: none !important; opacity: 0.6 !important; }
        }
      `}</style>
      {/* Left service node */}
      <g className="api-int-node" style={{
        opacity: nodesVisible ? 1 : fadingOut ? 0 : 0,
        transition: nodesVisible ? 'opacity 400ms ease-out' : 'opacity 500ms ease-in',
      }}>
        <rect x="24" y="42" width="56" height="56" rx="12" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="36" y="56" width="32" height="6" rx="2" fill="#8B5CF6" opacity="0.6" />
        <rect x="36" y="66" width="24" height="6" rx="2" fill="#8B5CF6" opacity="0.3" />
        <rect x="36" y="76" width="28" height="6" rx="2" fill="#8B5CF6" opacity="0.4" />
      </g>
      {/* Right service node */}
      <g className="api-int-node" style={{
        opacity: nodesVisible ? 1 : fadingOut ? 0 : 0,
        transition: nodesVisible ? 'opacity 400ms ease-out 200ms' : 'opacity 500ms ease-in 100ms',
      }}>
        <rect x="160" y="42" width="56" height="56" rx="12" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="188" cy="62" r="8" fill="#8B5CF6" opacity="0.15" />
        <circle cx="188" cy="62" r="4" fill="#8B5CF6" opacity="0.5" />
        <rect x="174" y="76" width="28" height="6" rx="2" fill="#8B5CF6" opacity="0.3" />
      </g>
      {/* Connection line */}
      <line x1="80" y1="70" x2="160" y2="70" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"
        className="api-int-line"
        style={{
          strokeDasharray: 80,
          strokeDashoffset: lineDrawn ? 0 : 80,
          opacity: fadingOut ? 0 : 1,
          transition: lineDrawn
            ? 'stroke-dashoffset 800ms ease-out, opacity 500ms ease-in'
            : 'stroke-dashoffset 0ms, opacity 500ms ease-in',
        }}
      />
      {/* Pulse dots */}
      {showPulse && [0, 1, 2].map((i) => (
        <circle key={i} cx={96 + i * 24} cy="70" r="3" fill="#FF5500"
          className="api-int-pulse-dot"
          style={{ animation: `api-int-pulse 1.5s ease-in-out ${i * 200}ms infinite` }}
        />
      ))}
    </svg>
  );
}

// ─── SVG Animation: Real-Time Data (live updating dashboard metrics) ────────
function RealTimeDataAnimation({ active }) {
  const pathD = 'M30,110 Q60,30 120,70 Q180,110 210,40';
  const [pos, setPos] = useState({ x: 30, y: 110 });
  const [progress, setProgress] = useState(0);
  const pathRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!active || !pathRef.current) {
      setProgress(0);
      setPos({ x: 30, y: 110 });
      return;
    }

    const path = pathRef.current;
    const total = path.getTotalLength();
    const travelDuration = 2500;
    const pauseDuration = 800;
    const cycleDuration = travelDuration + pauseDuration;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const pt = path.getPointAtLength(total);
      setPos({ x: pt.x, y: pt.y });
      setProgress(1);
      return;
    }

    function animate(ts) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const cycleElapsed = elapsed % cycleDuration;

      if (cycleElapsed <= travelDuration) {
        const rawProgress = cycleElapsed / travelDuration;
        const eased = 1 - Math.pow(1 - rawProgress, 3);
        const pt = path.getPointAtLength(eased * total);
        setPos({ x: pt.x, y: pt.y });
        setProgress(eased);
      } else {
        const pt = path.getPointAtLength(total);
        setPos({ x: pt.x, y: pt.y });
        setProgress(1);
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    startRef.current = null;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  const pathLengthEstimate = 300;
  const trailOffset = pathLengthEstimate * (1 - progress);

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .realtime-trail { stroke-dashoffset: 0 !important; }
          .realtime-pin { opacity: 1 !important; }
        }
      `}</style>
      {/* Mini dashboard frame */}
      <rect x="15" y="8" width="210" height="124" rx="6" fill="none" stroke="#E2E8F0" strokeWidth="0.5" opacity="0.5" />
      <rect x="15" y="8" width="210" height="16" rx="6" fill="#F8FAFC" />
      <circle cx="26" cy="16" r="2.5" fill="#8B5CF6" opacity="0.4" />
      <circle cx="34" cy="16" r="2.5" fill="#A78BFA" opacity="0.3" />
      <circle cx="42" cy="16" r="2.5" fill="#C4B5FD" opacity="0.2" />
      {/* Baseline path */}
      <path d={pathD} stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Animated trail */}
      <path ref={pathRef} d={pathD} stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className="realtime-trail"
        style={{
          strokeDasharray: pathLengthEstimate,
          strokeDashoffset: active ? trailOffset : pathLengthEstimate,
        }}
      />
      {/* Moving data point */}
      <g className="realtime-pin" style={{ opacity: active ? 1 : 0, transition: 'opacity 300ms ease-out' }}>
        <circle cx={pos.x} cy={pos.y} r="10" fill="#FF5500" opacity="0.15" />
        <circle cx={pos.x} cy={pos.y} r="5" fill="#FF5500" />
        <circle cx={pos.x} cy={pos.y} r="2" fill="#fff" />
      </g>
      {/* Static data points */}
      {[
        { x: 30, y: 110 }, { x: 120, y: 70 }, { x: 210, y: 40 },
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#8B5CF6" opacity="0.3" />
      ))}
    </svg>
  );
}

// ─── SVG Animation: SEO Analytics (ranking positions climbing) ──────────────
function SeoAnalyticsAnimation({ active }) {
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const target = 0.92;
  const filledOffset = circumference * (1 - target);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }
    let timers = [];
    const run = () => {
      setPhase(1);
      timers.push(setTimeout(() => setPhase(2), 1500));
      timers.push(setTimeout(() => setPhase(3), 2800));
      timers.push(setTimeout(() => { setPhase(0); timers.push(setTimeout(run, 200)); }, 3800));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const filling = phase === 1 || phase === 2;
  const dashOffset = filling ? filledOffset : circumference;
  const transitionDur = phase === 1 ? '1200ms' : phase === 3 ? '800ms' : '0ms';

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .seo-ring { stroke-dashoffset: ${filledOffset} !important; opacity: 1 !important; }
          .seo-text { opacity: 1 !important; }
        }
      `}</style>
      <circle cx="120" cy="70" r={r} fill="none" stroke="#E2E8F0" strokeWidth="8" />
      <circle cx="120" cy="70" r={r} fill="none" stroke="#8B5CF6" strokeWidth="8"
        strokeLinecap="round"
        className="seo-ring"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
          transform: 'rotate(-90deg)',
          transformOrigin: '120px 70px',
          transition: `stroke-dashoffset ${transitionDur} ease-in-out`,
        }}
      />
      <text x="120" y="63" textAnchor="middle" fill="#03071E" fontSize="18" fontWeight="600"
        className="seo-text"
        style={{ opacity: filling ? 1 : 0, transition: 'opacity 400ms ease-in-out' }}
      >#1</text>
      <text x="120" y="78" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="400"
        className="seo-text"
        style={{ opacity: filling ? 1 : 0, transition: 'opacity 400ms ease-in-out' }}
      >ranking</text>
    </svg>
  );
}

// ─── SVG Animation: Conversion Tracking (funnel with conversion %) ─────────
function ConversionTrackingAnimation({ active }) {
  const bars = [
    { x: 32, h: 90, color: '#8B5CF6', delay: 0, label: '100%' },
    { x: 68, h: 72, color: '#A78BFA', delay: 150, label: '80%' },
    { x: 104, h: 54, color: '#8B5CF6', delay: 300, label: '60%' },
    { x: 140, h: 36, color: '#A78BFA', delay: 450, label: '40%' },
    { x: 176, h: 22, color: '#FF5500', delay: 600, label: '24%' },
  ];
  const baseline = 120;
  const barWidth = 24;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }
    let timers = [];
    const run = () => {
      setPhase(1);
      timers.push(setTimeout(() => setPhase(2), 1400));
      timers.push(setTimeout(() => setPhase(3), 2800));
      timers.push(setTimeout(() => { setPhase(0); timers.push(setTimeout(run, 200)); }, 3800));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const grown = phase === 1 || phase === 2;
  const transDur = phase === 3 ? '600ms' : '700ms';

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .funnel-bar { height: auto !important; y: auto !important; opacity: 1 !important; }
        }
      `}</style>
      <line x1="20" y1={baseline} x2="220" y2={baseline} stroke="#E2E8F0" strokeWidth="1" />
      {[30, 55, 80, 105].map((y) => (
        <line key={y} x1="20" y1={y} x2="220" y2={y} stroke="#E2E8F0" strokeWidth="0.5" opacity="0.5" />
      ))}
      {/* Funnel connecting line */}
      {grown && (
        <path d={`M${32 + barWidth / 2},${baseline - 90} L${176 + barWidth / 2},${baseline - 22}`}
          stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      )}
      {bars.map((b, i) => (
        <rect key={i}
          className="funnel-bar"
          x={b.x} rx="4"
          y={grown ? baseline - b.h : baseline}
          width={barWidth}
          height={grown ? b.h : 0}
          fill={b.color}
          opacity={grown ? 0.8 : 0}
          style={{
            transition: `y ${transDur} ease-in-out ${b.delay}ms, height ${transDur} ease-in-out ${b.delay}ms, opacity 300ms ease-in-out ${b.delay}ms`,
          }}
        />
      ))}
      {bars.map((b, i) => (
        <text key={`l-${i}`} x={b.x + barWidth / 2} y={grown ? baseline - b.h - 6 : baseline - 6}
          textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="500"
          style={{
            opacity: grown ? 1 : 0,
            transition: `opacity 300ms ease-in-out ${b.delay + 400}ms`,
          }}
        >{b.label}</text>
      ))}
      {/* Funnel label */}
      <text x="120" y="136" textAnchor="middle" fill="#94A3B8" fontSize="7" fontWeight="400"
        style={{ opacity: grown ? 0.8 : 0, transition: 'opacity 400ms ease-in-out 800ms' }}
      >Visitors &rarr; Leads &rarr; Customers</text>
    </svg>
  );
}

// ─── SVG Animation: Client Dashboard (mini dashboard with live stats) ──────
function ClientDashboardAnimation({ active }) {
  const metrics = [
    { label: 'Traffic', width: 168, color: '#8B5CF6', delay: 0 },
    { label: 'Leads', width: 132, color: '#A78BFA', delay: 150 },
    { label: 'Revenue', width: 192, color: '#FF5500', delay: 300 },
    { label: 'ROI', width: 156, color: '#8B5CF6', delay: 450 },
  ];
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }
    let timers = [];
    const run = () => {
      setPhase(1);
      timers.push(setTimeout(() => setPhase(2), 1400));
      timers.push(setTimeout(() => setPhase(3), 2800));
      timers.push(setTimeout(() => { setPhase(0); timers.push(setTimeout(run, 200)); }, 3800));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const filled = phase === 1 || phase === 2;
  const transDur = phase === 3 ? '600ms' : '800ms';

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .dash-bar { width: auto !important; opacity: 1 !important; }
          .dash-label { opacity: 1 !important; }
        }
      `}</style>
      {metrics.map((m, i) => {
        const y = 16 + i * 30;
        return (
          <g key={i}>
            <text x="16" y={y + 12} fill="#64748B" fontSize="9" fontWeight="500"
              className="dash-label"
              style={{ opacity: filled ? 1 : 0, transition: `opacity 300ms ease-in-out ${m.delay}ms` }}
            >{m.label}</text>
            <rect x="56" y={y} width="168" height="16" rx="4" fill="#F1F5F9" />
            <rect x="56" y={y} rx="4" height="16"
              className="dash-bar"
              fill={m.color} opacity={filled ? 0.7 : 0}
              width={filled ? m.width : 0}
              style={{
                transition: `width ${transDur} ease-in-out ${m.delay}ms, opacity 300ms ease-in-out ${m.delay}ms`,
              }}
            />
            <text x={filled ? 56 + m.width - 6 : 56} y={y + 11.5}
              textAnchor="end" fill="#fff" fontSize="8" fontWeight="600"
              style={{
                opacity: filled ? 1 : 0,
                transition: `opacity 300ms ease-in-out ${m.delay + 500}ms`,
              }}
            >{Math.round(m.width / 192 * 100)}%</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Sub-Card Component ─────────────────────────────────────────────────────
function SubCard({ title, description, children, delay = 0 }) {
  const [ref, inView] = useInView(0.15);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl border border-[#E8ECF2] p-5 sm:p-6"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      <div style={{ marginBottom: 16, borderRadius: 10, overflow: 'hidden', background: '#FAFBFE' }}>
        {typeof children === 'function' ? children(inView) : children}
      </div>
      <h4 style={{
        fontSize: '1rem', fontWeight: 600, color: '#03071E',
        margin: '0 0 6px 0', lineHeight: 1.3,
      }}>{title}</h4>
      <p style={{
        fontSize: '0.875rem', fontWeight: 400, color: '#64748B',
        margin: 0, lineHeight: 1.5,
      }}>{description}</p>
    </div>
  );
}

// ─── Feature Section Component ──────────────────────────────────────────────
function FeatureSection({ icon, heading, subtitle, cards }) {
  return (
    <section className="py-16 md:py-20 lg:py-[80px]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <FadeIn>
          <div style={{ marginBottom: 12 }}>{icon}</div>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 300,
            color: '#03071E',
            margin: '0 0 16px 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>{heading}</h2>
        </FadeIn>
        <FadeIn delay={200}>
          <div style={{
            fontSize: '1.05rem',
            fontWeight: 400,
            color: '#64748B',
            maxWidth: 600,
            margin: '0 0 48px 0',
            lineHeight: 1.6,
          }}>{subtitle}</div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <SubCard key={i} title={card.title} description={card.description} delay={i * 150}>
              {card.animation}
            </SubCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stat highlight helper ──────────────────────────────────────────────────
function Stat({ children }) {
  return <span style={{ fontWeight: 700, color: '#8B5CF6' }}>{children}</span>;
}

// ─── Main FeatureCardsAidxn Component ───────────────────────────────────────
export default function FeatureCardsAidxn() {
  return (
    <div style={{ background: '#F8F9FC' }}>
      {/* Section 1: Design */}
      <FeatureSection
        icon={<DesignIcon />}
        heading="Design that converts."
        subtitle={
          <span>Beautiful websites built to drive <Stat>real business results</Stat> with pixel-perfect craft.</span>
        }
        cards={[
          {
            title: 'Custom Layouts',
            description: 'Bespoke wireframes and page structures designed around your content and conversion goals.',
            animation: (inView) => <CustomLayoutsAnimation active={inView} />,
          },
          {
            title: 'Responsive Design',
            description: 'Every layout adapts seamlessly from desktop to tablet to mobile — no breakpoint left behind.',
            animation: (inView) => <ResponsiveDesignAnimation active={inView} />,
          },
          {
            title: 'Brand Systems',
            description: 'Cohesive color palettes, typography, and design tokens that scale across every touchpoint.',
            animation: (inView) => <BrandSystemsAnimation active={inView} />,
          },
        ]}
      />

      {/* Section 2: Develop */}
      <FeatureSection
        icon={<CodeIcon />}
        heading="Built for speed."
        subtitle={
          <span>Lightning-fast sites on the <Stat>modern web stack</Stat> — because milliseconds matter.</span>
        }
        cards={[
          {
            title: 'Performance First',
            description: 'Optimised load times and Core Web Vitals that keep visitors engaged and Google happy.',
            animation: (inView) => <PerformanceAnimation active={inView} />,
          },
          {
            title: 'API Integration',
            description: 'Seamless connections to your CRM, payments, analytics, and third-party services.',
            animation: (inView) => <ApiIntegrationAnimation active={inView} />,
          },
          {
            title: 'Real-Time Data',
            description: 'Live-updating dashboards and dynamic content powered by real-time data streams.',
            animation: (inView) => <RealTimeDataAnimation active={inView} />,
          },
        ]}
      />

      {/* Section 3: Grow */}
      <FeatureSection
        icon={<GrowthIcon />}
        heading="Measure everything."
        subtitle={
          <span>Data-driven decisions that <Stat>grow your business</Stat> with full visibility into what works.</span>
        }
        cards={[
          {
            title: 'SEO Analytics',
            description: 'Track your search rankings climbing as on-page optimisation takes effect.',
            animation: (inView) => <SeoAnalyticsAnimation active={inView} />,
          },
          {
            title: 'Conversion Tracking',
            description: 'Visualise your funnel from first click to closed deal with real conversion rates.',
            animation: (inView) => <ConversionTrackingAnimation active={inView} />,
          },
          {
            title: 'Client Dashboard',
            description: 'Live performance dashboards so you always know your traffic, leads, revenue, and ROI.',
            animation: (inView) => <ClientDashboardAnimation active={inView} />,
          },
        ]}
      />
    </div>
  );
}

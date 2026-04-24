/**
 * FeatureCards — Copied from StaffLocationSort/src/components/landing/FeatureCards.jsx
 *
 * 3-column horizontal card grid with animated SVG illustrations.
 * Three sections: Import, Optimise, Track — each with 3 animated sub-cards.
 *
 * All styling is inline (no external CSS required).
 * Dependencies: react
 *
 * Usage in Astro: <FeatureCards client:load />
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

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
function ConnectionIcon() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      border: '1.5px solid #E2E8F0', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#fff',
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" fill="#4E5DB5" />
        <path d="M10 2v5M10 13v5M2 10h5M13 10h5" stroke="#4E5DB5" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4.5 4.5l3.5 3.5M12 12l3.5 3.5M4.5 15.5l3.5-3.5M12 8l3.5-3.5" stroke="#4E5DB5" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    </div>
  );
}

function RouteIcon() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      border: '1.5px solid #E2E8F0', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#fff',
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="4" cy="4" r="2" fill="#4E5DB5" />
        <circle cx="16" cy="8" r="2" fill="#4E5DB5" />
        <circle cx="6" cy="16" r="2" fill="#4E5DB5" />
        <path d="M5.5 5.5L14.5 7.5M14.5 9.5L7.5 14.5" stroke="#4E5DB5" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
      </svg>
    </div>
  );
}

function ChartIcon() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      border: '1.5px solid #E2E8F0', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: '#fff',
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="12" width="3" height="6" rx="1" fill="#4E5DB5" opacity="0.4" />
        <rect x="7" y="8" width="3" height="10" rx="1" fill="#4E5DB5" opacity="0.7" />
        <rect x="12" y="4" width="3" height="14" rx="1" fill="#4E5DB5" />
        <path d="M3.5 11L8.5 7L13.5 3" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── SVG Animation: CRM Sync (data rows flowing in, looping) ────────────────
function CrmSyncAnimation({ active }) {
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

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .crm-row { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      {rows.map((i) => (
        <g key={i}
          className="crm-row"
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
          <rect x="20" y={16 + i * 24} width="200" height="18" rx="4" fill="#F1F5F9" />
          <rect x="24" y={20 + i * 24} width={12} height="10" rx="2" fill="#4E5DB5" opacity="0.3" />
          <rect x="42" y={20 + i * 24} width={60 + (i % 3) * 20} height="10" rx="2" fill="#4E5DB5"
            style={{
              opacity: isVisible ? 0.6 : 0,
              transition: isVisible
                ? `opacity 400ms ease-out ${i * 100 + 200}ms`
                : `opacity 300ms ease-in ${(4 - i) * 80}ms`,
            }}
          />
          <rect x="160" y={20 + i * 24} width="50" height="10" rx="2" fill="#6D95F3"
            style={{
              opacity: isVisible ? 0.4 : 0,
              transition: isVisible
                ? `opacity 400ms ease-out ${i * 100 + 350}ms`
                : `opacity 300ms ease-in ${(4 - i) * 80}ms`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}

// ─── SVG Animation: API Connection (two nodes connecting, looping) ───────────
function ApiConnectionAnimation({ active }) {
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
        @keyframes api-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .api-line, .api-node { opacity: 1 !important; }
          .api-pulse-dot { animation: none !important; opacity: 0.6 !important; }
        }
      `}</style>
      <g className="api-node" style={{
        opacity: nodesVisible ? 1 : fadingOut ? 0 : 0,
        transition: nodesVisible ? 'opacity 400ms ease-out' : 'opacity 500ms ease-in',
      }}>
        <rect x="24" y="42" width="56" height="56" rx="12" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="36" y="56" width="32" height="6" rx="2" fill="#4E5DB5" opacity="0.6" />
        <rect x="36" y="66" width="24" height="6" rx="2" fill="#4E5DB5" opacity="0.3" />
        <rect x="36" y="76" width="28" height="6" rx="2" fill="#4E5DB5" opacity="0.4" />
      </g>
      <g className="api-node" style={{
        opacity: nodesVisible ? 1 : fadingOut ? 0 : 0,
        transition: nodesVisible ? 'opacity 400ms ease-out 200ms' : 'opacity 500ms ease-in 100ms',
      }}>
        <rect x="160" y="42" width="56" height="56" rx="12" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="188" cy="62" r="8" fill="#4E5DB5" opacity="0.15" />
        <circle cx="188" cy="62" r="4" fill="#4E5DB5" opacity="0.5" />
        <rect x="174" y="76" width="28" height="6" rx="2" fill="#4E5DB5" opacity="0.3" />
      </g>
      <line x1="80" y1="70" x2="160" y2="70" stroke="#4E5DB5" strokeWidth="2" strokeLinecap="round"
        className="api-line"
        style={{
          strokeDasharray: 80,
          strokeDashoffset: lineDrawn ? 0 : 80,
          opacity: fadingOut ? 0 : 1,
          transition: lineDrawn
            ? 'stroke-dashoffset 800ms ease-out, opacity 500ms ease-in'
            : 'stroke-dashoffset 0ms, opacity 500ms ease-in',
        }}
      />
      {showPulse && [0, 1, 2].map((i) => (
        <circle key={i} cx={96 + i * 24} cy="70" r="3" fill="#FF5500"
          className="api-pulse-dot"
          style={{ animation: `api-pulse 1.5s ease-in-out ${i * 200}ms infinite` }}
        />
      ))}
    </svg>
  );
}

// ─── SVG Animation: Auto-Import (scattered dots organizing, looping) ─────────
function AutoImportAnimation({ active }) {
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
  const colors = ['#4E5DB5', '#6D95F3', '#FF5500', '#4E5DB5', '#6D95F3', '#4E5DB5', '#FF5500', '#6D95F3', '#4E5DB5'];

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
          .import-dot { opacity: 1 !important; }
        }
      `}</style>
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
        return (
          <g key={i}>
            <rect
              className="import-dot"
              x={(isOrganized ? t.x : s.x) - 10}
              y={(isOrganized ? t.y : s.y) - 10}
              width="20" height="20" rx="5"
              fill={colors[i]} opacity={isOrganized ? 0.2 : 0.15}
              style={{
                transition: isOrganized
                  ? `all 700ms ease-out ${i * 80}ms`
                  : `all 600ms ease-in-out ${i * 60}ms`,
              }}
            />
            <rect
              className="import-dot"
              x={(isOrganized ? t.x : s.x) - 5}
              y={(isOrganized ? t.y : s.y) - 5}
              width="10" height="10" rx="3"
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

// ─── SVG Animation: Smart Routing (pins with route line, looping) ──────────
function SmartRoutingAnimation({ active }) {
  const pins = [
    { x: 40, y: 100 },
    { x: 80, y: 40 },
    { x: 130, y: 80 },
    { x: 175, y: 30 },
    { x: 210, y: 95 },
  ];
  const pathD = `M40,100 L80,40 L130,80 L175,30 L210,95`;
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

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .route-path { stroke-dashoffset: 0 !important; }
          .route-pin { opacity: 1 !important; }
        }
      `}</style>
      {[20, 40, 60, 80, 100, 120].map((y) => (
        <line key={`g-${y}`} x1="10" y1={y} x2="230" y2={y} stroke="#E2E8F0" strokeWidth="0.5" opacity="0.4" />
      ))}
      {[30, 60, 90, 120, 150, 180, 210].map((x) => (
        <line key={`g-${x}`} x1={x} y1="10" x2={x} y2="130" stroke="#E2E8F0" strokeWidth="0.5" opacity="0.4" />
      ))}
      <path d={pathD} stroke="#4E5DB5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className="route-path"
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
      {pins.map((p, i) => (
        <g key={i} className="route-pin" style={{
          opacity: pinsVisible ? 1 : 0,
          transition: pinsVisible
            ? `opacity 300ms ease-out ${i * 100}ms`
            : 'opacity 400ms ease-in-out',
        }}>
          <circle cx={p.x} cy={p.y} r="8" fill="#4E5DB5" opacity="0.15" />
          <circle cx={p.x} cy={p.y} r="4.5" fill={i === 0 ? '#FF5500' : '#4E5DB5'} />
          <circle cx={p.x} cy={p.y} r="2" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

// ─── SVG Animation: Time Windows (clock with time blocks, looping) ─────────
function TimeWindowsAnimation({ active }) {
  const blocks = [
    { start: -60, end: 0, color: '#4E5DB5' },
    { start: 30, end: 90, color: '#6D95F3' },
    { start: 120, end: 180, color: '#FF5500' },
    { start: 210, end: 270, color: '#4E5DB5' },
  ];

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setPhase(4); return; }

    const timers = [];
    function runCycle() {
      setPhase(1);
      const schedule = [
        { delay: 400, next: 2 },
        { delay: 800, next: 3 },
        { delay: 900, next: 4 },
        { delay: 1200, next: 5 },
        { delay: 700, next: 0 },
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

  const clockVisible = phase >= 1 && phase <= 4;
  const arcsVisible = phase >= 2 && phase <= 4;
  const handsMoved = phase >= 3 && phase <= 4;
  const fadingOut = phase === 5;

  function arcPath(startAngle, endAngle, r) {
    const s = (startAngle - 90) * Math.PI / 180;
    const e = (endAngle - 90) * Math.PI / 180;
    const x1 = 120 + r * Math.cos(s);
    const y1 = 70 + r * Math.sin(s);
    const x2 = 120 + r * Math.cos(e);
    const y2 = 70 + r * Math.sin(e);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M120,70 L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
  }

  return (
    <svg viewBox="0 0 240 140" fill="none" style={{ width: '100%', height: 140 }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .tw-block, .tw-hand { opacity: 1 !important; }
        }
      `}</style>
      <circle cx="120" cy="70" r="50" fill="#F8F9FC" stroke="#E2E8F0" strokeWidth="1.5"
        style={{
          opacity: clockVisible ? 1 : fadingOut ? 0 : 0,
          transition: clockVisible ? 'opacity 350ms ease-out' : 'opacity 500ms ease-in',
        }}
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180;
        const x1 = 120 + 44 * Math.cos(a);
        const y1 = 70 + 44 * Math.sin(a);
        const x2 = 120 + 48 * Math.cos(a);
        const y2 = 70 + 48 * Math.sin(a);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"
            style={{
              opacity: clockVisible ? 1 : fadingOut ? 0 : 0,
              transition: clockVisible ? 'opacity 350ms ease-out' : 'opacity 500ms ease-in',
            }}
          />
        );
      })}
      {blocks.map((b, i) => (
        <path key={i} d={arcPath(b.start, b.end, 38)} fill={b.color}
          className="tw-block"
          style={{
            opacity: arcsVisible ? 0.25 : 0,
            transition: arcsVisible ? `opacity 400ms ease-out ${i * 150}ms` : 'opacity 400ms ease-in',
          }}
        />
      ))}
      <line x1="120" y1="70" x2="120" y2="36" stroke="#03071E" strokeWidth="2" strokeLinecap="round"
        className="tw-hand"
        style={{
          opacity: clockVisible ? 1 : 0,
          transformOrigin: '120px 70px',
          transform: handsMoved ? 'rotate(0deg)' : 'rotate(-30deg)',
          transition: clockVisible
            ? 'opacity 400ms ease-out, transform 800ms ease-in-out'
            : 'opacity 400ms ease-in, transform 400ms ease-in',
        }}
      />
      <line x1="120" y1="70" x2="145" y2="58" stroke="#03071E" strokeWidth="1.5" strokeLinecap="round"
        className="tw-hand"
        style={{
          opacity: clockVisible ? 0.7 : 0,
          transformOrigin: '120px 70px',
          transform: handsMoved ? 'rotate(0deg)' : 'rotate(-60deg)',
          transition: clockVisible
            ? 'opacity 400ms ease-out, transform 800ms ease-in-out 200ms'
            : 'opacity 400ms ease-in, transform 400ms ease-in',
        }}
      />
      <circle cx="120" cy="70" r="3" fill="#FF5500"
        style={{
          opacity: clockVisible ? 1 : 0,
          transition: clockVisible ? 'opacity 350ms ease-out' : 'opacity 500ms ease-in',
        }}
      />
    </svg>
  );
}

// ─── SVG Animation: Live Updates (pin moving along path, looping) ──────────
function LiveUpdatesAnimation({ active }) {
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
          .live-trail { stroke-dashoffset: 0 !important; }
          .live-pin { opacity: 1 !important; }
        }
      `}</style>
      <path d={pathD} stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path ref={pathRef} d={pathD} stroke="#4E5DB5" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className="live-trail"
        style={{
          strokeDasharray: pathLengthEstimate,
          strokeDashoffset: active ? trailOffset : pathLengthEstimate,
        }}
      />
      <g className="live-pin" style={{ opacity: active ? 1 : 0, transition: 'opacity 300ms ease-out' }}>
        <circle cx={pos.x} cy={pos.y} r="10" fill="#FF5500" opacity="0.15" />
        <circle cx={pos.x} cy={pos.y} r="5" fill="#FF5500" />
        <circle cx={pos.x} cy={pos.y} r="2" fill="#fff" />
      </g>
      {[
        { x: 30, y: 110 }, { x: 120, y: 70 }, { x: 210, y: 40 },
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#4E5DB5" opacity="0.3" />
      ))}
    </svg>
  );
}

// ─── SVG Animation: Completion Ring (circular progress to 87%) ──────────────
function CompletionRingAnimation({ active }) {
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const target = 0.87;
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
          .ring-progress { stroke-dashoffset: ${filledOffset} !important; opacity: 1 !important; }
          .ring-text { opacity: 1 !important; }
        }
      `}</style>
      <circle cx="120" cy="70" r={r} fill="none" stroke="#E2E8F0" strokeWidth="8" />
      <circle cx="120" cy="70" r={r} fill="none" stroke="#4E5DB5" strokeWidth="8"
        strokeLinecap="round"
        className="ring-progress"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
          transform: 'rotate(-90deg)',
          transformOrigin: '120px 70px',
          transition: `stroke-dashoffset ${transitionDur} ease-in-out`,
        }}
      />
      <text x="120" y="65" textAnchor="middle" fill="#03071E" fontSize="20" fontWeight="600"
        className="ring-text"
        style={{ opacity: filling ? 1 : 0, transition: 'opacity 400ms ease-in-out' }}
      >87%</text>
      <text x="120" y="82" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="400"
        className="ring-text"
        style={{ opacity: filling ? 1 : 0, transition: 'opacity 400ms ease-in-out' }}
      >completed</text>
    </svg>
  );
}

// ─── SVG Animation: Bar Chart (bars growing up) ─────────────────────────────
function BarChartAnimation({ active }) {
  const bars = [
    { x: 32, h: 70, color: '#4E5DB5', delay: 0 },
    { x: 68, h: 50, color: '#6D95F3', delay: 150 },
    { x: 104, h: 85, color: '#4E5DB5', delay: 300 },
    { x: 140, h: 60, color: '#6D95F3', delay: 450 },
    { x: 176, h: 90, color: '#FF5500', delay: 600 },
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
          .bar-rect { height: auto !important; y: auto !important; opacity: 1 !important; }
        }
      `}</style>
      <line x1="20" y1={baseline} x2="220" y2={baseline} stroke="#E2E8F0" strokeWidth="1" />
      {[30, 55, 80, 105].map((y) => (
        <line key={y} x1="20" y1={y} x2="220" y2={y} stroke="#E2E8F0" strokeWidth="0.5" opacity="0.5" />
      ))}
      {bars.map((b, i) => (
        <rect key={i}
          className="bar-rect"
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
        >{Math.round(b.h / 90 * 100)}%</text>
      ))}
    </svg>
  );
}

// ─── SVG Animation: Team Metrics (horizontal comparison bars) ───────────────
function TeamMetricsAnimation({ active }) {
  const metrics = [
    { label: 'Team A', width: 168, color: '#4E5DB5', delay: 0 },
    { label: 'Team B', width: 132, color: '#6D95F3', delay: 150 },
    { label: 'Team C', width: 192, color: '#FF5500', delay: 300 },
    { label: 'Team D', width: 108, color: '#4E5DB5', delay: 450 },
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
          .metric-bar { width: auto !important; opacity: 1 !important; }
          .metric-label { opacity: 1 !important; }
        }
      `}</style>
      {metrics.map((m, i) => {
        const y = 16 + i * 30;
        return (
          <g key={i}>
            <text x="16" y={y + 12} fill="#64748B" fontSize="9" fontWeight="500"
              className="metric-label"
              style={{ opacity: filled ? 1 : 0, transition: `opacity 300ms ease-in-out ${m.delay}ms` }}
            >{m.label}</text>
            <rect x="56" y={y} width="168" height="16" rx="4" fill="#F1F5F9" />
            <rect x="56" y={y} rx="4" height="16"
              className="metric-bar"
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
  return <span style={{ fontWeight: 700, color: '#4E5DB5' }}>{children}</span>;
}

// ─── Main FeatureCards Component ─────────────────────────────────────────────
export default function FeatureCards() {
  return (
    <div style={{ background: '#F8F9FC' }}>
      <FeatureSection
        icon={<ConnectionIcon />}
        heading="Import your data."
        subtitle={
          <span>Cut setup time by up to <Stat>92%</Stat> and reduce complexity by syncing your CRM data automatically.</span>
        }
        cards={[
          {
            title: 'CRM Sync',
            description: 'Pull deals, contacts, and field data directly from your CRM with one click.',
            animation: (inView) => <CrmSyncAnimation active={inView} />,
          },
          {
            title: 'API Connection',
            description: 'Secure, encrypted connection to your Pipedrive instance with automatic token refresh.',
            animation: (inView) => <ApiConnectionAnimation active={inView} />,
          },
          {
            title: 'Auto-Import',
            description: 'Scattered data points reorganize themselves into structured, actionable records.',
            animation: (inView) => <AutoImportAnimation active={inView} />,
          },
        ]}
      />

      <FeatureSection
        icon={<RouteIcon />}
        heading="Optimise your routes."
        subtitle={
          <span>Save up to <Stat>30%</Stat> drive time by automatically optimising routes for your field team.</span>
        }
        cards={[
          {
            title: 'Smart Routing',
            description: 'Algorithms find the fastest path through every stop, cutting wasted kilometres.',
            animation: (inView) => <SmartRoutingAnimation active={inView} />,
          },
          {
            title: 'Time Windows',
            description: 'Honour customer availability by slotting inspections into the right time blocks.',
            animation: (inView) => <TimeWindowsAnimation active={inView} />,
          },
          {
            title: 'Live Updates',
            description: 'Track your team in real-time as they move through their daily schedule.',
            animation: (inView) => <LiveUpdatesAnimation active={inView} />,
          },
        ]}
      />

      <FeatureSection
        icon={<ChartIcon />}
        heading="Track performance."
        subtitle={
          <span>Get <Stat>real-time</Stat> visibility into your team's performance with live dashboards.</span>
        }
        cards={[
          {
            title: 'Completion Rates',
            description: 'Monitor how many inspections are finished on time across your whole team.',
            animation: (inView) => <CompletionRingAnimation active={inView} />,
          },
          {
            title: 'Route Efficiency',
            description: 'Compare daily output across inspectors with stacked performance charts.',
            animation: (inView) => <BarChartAnimation active={inView} />,
          },
          {
            title: 'Team Metrics',
            description: 'Side-by-side team comparisons so you know who needs support and who is leading.',
            animation: (inView) => <TeamMetricsAnimation active={inView} />,
          },
        ]}
      />
    </div>
  );
}

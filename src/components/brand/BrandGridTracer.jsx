/**
 * BrandGridTracer — Branded 3D grid with animated light-path traces.
 *
 * Light traces travel along grid lines continuously, creating a
 * "data flowing through circuits" effect. Used as the primary hero background.
 *
 * Usage: <BrandGridTracer client:load />
 */

import React, { useState, useEffect } from 'react';

// Trace paths that follow the grid lines (right-angle segments)
const traces = [
  { d: 'M 0 180 L 310 180 L 310 420 L 640 420', len: 790, dur: 4, delay: 0 },
  { d: 'M 480 0 L 480 300 L 800 300', len: 620, dur: 3.5, delay: 1.2 },
  { d: 'M 940 60 L 940 420 L 640 420 L 640 560', len: 640, dur: 4.2, delay: 0.6 },
  { d: 'M 140 560 L 140 300 L 480 300 L 480 120', len: 780, dur: 4.5, delay: 2 },
  { d: 'M 800 0 L 800 180 L 640 180 L 640 60 L 310 60', len: 840, dur: 5, delay: 0.3 },
  { d: 'M 0 420 L 310 420 L 310 180 L 480 180', len: 720, dur: 3.8, delay: 1.8 },
  { d: 'M 220 0 L 220 300 L 560 300 L 560 560', len: 820, dur: 4.8, delay: 3 },
  { d: 'M 870 650 L 870 180 L 720 180 L 720 490', len: 940, dur: 5.5, delay: 0.8 },
];

export default function BrandGridTracer({ className = '' }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ pointerEvents: 'none' }}>
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
        <defs>
          {/* Glow filter for trace heads */}
          <filter id="trace-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Static grid (3 tiers) ── */}
        <g stroke="rgba(139,92,246,0.06)" strokeWidth="1.2" fill="none">
          {[60,180,300,420,560].map(y => <line key={`h1-${y}`} x1="0" y1={y} x2="1000" y2={y} />)}
          {[140,310,480,640,800,940].map(x => <line key={`v1-${x}`} x1={x} y1="0" x2={x} y2="650" />)}
        </g>
        <g stroke="rgba(139,92,246,0.04)" strokeWidth="0.7" fill="none">
          {[120,240,360,490].map(y => <line key={`h2-${y}`} x1="0" y1={y} x2="1000" y2={y} />)}
          {[60,220,390,560,720,870].map(x => <line key={`v2-${x}`} x1={x} y1="0" x2={x} y2="650" />)}
        </g>
        <g stroke="rgba(139,92,246,0.02)" strokeWidth="0.5" fill="none">
          {[30,90,150,210,270,330,390,450,525,585].map(y => <line key={`h3-${y}`} x1="0" y1={y} x2="1000" y2={y} />)}
          {[100,180,265,350,435,520,600,680,760,835,905].map(x => <line key={`v3-${x}`} x1={x} y1="0" x2={x} y2="650" />)}
        </g>

        {/* Diagonals */}
        <g stroke="rgba(139,92,246,0.03)" strokeWidth="0.6" fill="none">
          <line x1="140" y1="60" x2="480" y2="420" />
          <line x1="640" y1="60" x2="940" y2="360" />
          <line x1="310" y1="420" x2="640" y2="560" />
          <line x1="800" y1="180" x2="940" y2="560" />
        </g>

        {/* Junction nodes (static) */}
        {[
          [310,180],[480,300],[640,180],[800,300],[310,420],[640,420],
          [480,120],[720,490],[220,300],[560,560],[870,180],[940,420],
        ].map(([x,y], i) => (
          <g key={`jn-${i}`}>
            <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(139,92,246,0.04)" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="3.5" fill="none" stroke="rgba(139,92,246,0.025)" strokeWidth="0.5" />
          </g>
        ))}

        {/* ── Animated light traces ── */}
        {traces.map((trace, i) => {
          const traceLen = 80; // length of the visible trace "worm"
          return (
            <g key={`trace-${i}`}>
              {/* Trace body (the visible moving segment) */}
              <path
                d={trace.d}
                fill="none"
                stroke="rgba(139,92,246,0.35)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${traceLen} ${trace.len}`}
                filter="url(#trace-glow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={trace.len}
                  to={-traceLen}
                  dur={`${trace.dur}s`}
                  begin={`${trace.delay}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Brighter head of the trace */}
              <path
                d={trace.d}
                fill="none"
                stroke="rgba(139,92,246,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`6 ${trace.len + traceLen - 6}`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={trace.len}
                  to={-traceLen}
                  dur={`${trace.dur}s`}
                  begin={`${trace.delay}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}

        {/* Junction pulse when trace passes through */}
        {[
          [310,180],[480,300],[640,180],[800,300],[640,420],[480,120],
        ].map(([x,y], i) => (
          <circle key={`pulse-${i}`} cx={x} cy={y} r="4" fill="rgba(139,92,246,0.15)">
            <animate
              attributeName="r"
              values="4;12;4"
              dur={`${2.5 + i * 0.3}s`}
              begin={`${i * 0.8}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.15;0.03;0.15"
              dur={`${2.5 + i * 0.3}s`}
              begin={`${i * 0.8}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Radial lighten behind hero text (bottom-left) */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 15% 25%, rgba(248,249,252,0.95) 0%, rgba(248,249,252,0.6) 30%, transparent 60%)',
      }} />
    </div>
  );
}

export { BrandGridTracer };

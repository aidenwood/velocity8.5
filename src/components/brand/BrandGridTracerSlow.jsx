/**
 * BrandGridTracerSlow — Slower version of the branded grid tracer.
 * Used as a subtle background for the main hero and other sections
 * where the full-speed tracer would be too distracting.
 *
 * Trace speeds are 2.5x slower, opacity is lower.
 *
 * Usage: <BrandGridTracerSlow client:load />
 */

import React, { useState, useEffect } from 'react';

const traces = [
  { d: 'M 0 180 L 310 180 L 310 420 L 640 420', len: 790, dur: 10, delay: 0 },
  { d: 'M 480 0 L 480 300 L 800 300', len: 620, dur: 8.5, delay: 2 },
  { d: 'M 940 60 L 940 420 L 640 420 L 640 560', len: 640, dur: 10.5, delay: 1.5 },
  { d: 'M 140 560 L 140 300 L 480 300 L 480 120', len: 780, dur: 11, delay: 4 },
  { d: 'M 800 0 L 800 180 L 640 180 L 640 60 L 310 60', len: 840, dur: 12, delay: 0.8 },
  { d: 'M 0 420 L 310 420 L 310 180 L 480 180', len: 720, dur: 9.5, delay: 3.5 },
  { d: 'M 220 0 L 220 300 L 560 300 L 560 560', len: 820, dur: 12, delay: 6 },
  { d: 'M 870 650 L 870 180 L 720 180 L 720 490', len: 940, dur: 14, delay: 2 },
];

export default function BrandGridTracerSlow({ className = '' }) {
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
          <filter id="trace-glow-slow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary grid */}
        <g stroke="rgba(139,92,246,0.05)" strokeWidth="1.2" fill="none">
          {[60,180,300,420,560].map(y => <line key={`h1-${y}`} x1="0" y1={y} x2="1000" y2={y} />)}
          {[140,310,480,640,800,940].map(x => <line key={`v1-${x}`} x1={x} y1="0" x2={x} y2="650" />)}
        </g>

        {/* Secondary grid */}
        <g stroke="rgba(139,92,246,0.03)" strokeWidth="0.7" fill="none">
          {[120,240,360,490].map(y => <line key={`h2-${y}`} x1="0" y1={y} x2="1000" y2={y} />)}
          {[60,220,390,560,720,870].map(x => <line key={`v2-${x}`} x1={x} y1="0" x2={x} y2="650" />)}
        </g>

        {/* Tertiary grid */}
        <g stroke="rgba(139,92,246,0.015)" strokeWidth="0.5" fill="none">
          {[30,90,150,210,270,330,390,450,525,585].map(y => <line key={`h3-${y}`} x1="0" y1={y} x2="1000" y2={y} />)}
          {[100,180,265,350,435,520,600,680,760,835,905].map(x => <line key={`v3-${x}`} x1={x} y1="0" x2={x} y2="650" />)}
        </g>

        {/* Diagonals */}
        <g stroke="rgba(139,92,246,0.025)" strokeWidth="0.6" fill="none">
          <line x1="140" y1="60" x2="480" y2="420" />
          <line x1="640" y1="60" x2="940" y2="360" />
          <line x1="310" y1="420" x2="640" y2="560" />
          <line x1="800" y1="180" x2="940" y2="560" />
        </g>

        {/* Junction nodes */}
        {[
          [310,180],[480,300],[640,180],[800,300],[310,420],[640,420],
          [480,120],[720,490],[220,300],[560,560],[870,180],[940,420],
        ].map(([x,y], i) => (
          <g key={`jn-${i}`}>
            <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(139,92,246,0.035)" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="3.5" fill="none" stroke="rgba(139,92,246,0.02)" strokeWidth="0.5" />
          </g>
        ))}

        {/* Slow light traces */}
        {traces.map((trace, i) => {
          const traceLen = 100;
          return (
            <g key={`trace-${i}`}>
              <path
                d={trace.d}
                fill="none"
                stroke="rgba(139,92,246,0.2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${traceLen} ${trace.len}`}
                filter="url(#trace-glow-slow)"
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
              <path
                d={trace.d}
                fill="none"
                stroke="rgba(139,92,246,0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`8 ${trace.len + traceLen - 8}`}
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

        {/* Subtle junction pulses */}
        {[
          [310,180],[480,300],[640,420],[480,120],
        ].map(([x,y], i) => (
          <circle key={`pulse-${i}`} cx={x} cy={y} r="4" fill="rgba(139,92,246,0.08)">
            <animate attributeName="r" values="4;14;4" dur={`${4 + i * 0.5}s`} begin={`${i * 1.2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.08;0.02;0.08" dur={`${4 + i * 0.5}s`} begin={`${i * 1.2}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

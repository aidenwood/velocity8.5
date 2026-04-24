/**
 * BrandGrid — Reusable Aidxn branded 3D perspective grid background.
 *
 * Variants:
 *   - "section"  → fills parent container (position absolute inset-0)
 *   - "fullscreen" → fixed fullscreen (for suspense/transitions)
 *
 * Props:
 *   - variant: "section" | "fullscreen" (default "section")
 *   - opacity: number 0-1 (default 1, controls overall grid opacity)
 *   - animate: boolean (default false, enables subtle pulse on junction nodes)
 *   - className: extra classes on wrapper
 *
 * Usage:
 *   <BrandGrid />                          — section background
 *   <BrandGrid variant="fullscreen" />     — fullscreen overlay
 *   <BrandGrid animate opacity={0.5} />    — subtle animated background
 */

import React, { useState, useEffect } from 'react';

export default function BrandGrid({ variant = 'section', opacity = 1, animate = false, className = '' }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const wrapperClass = variant === 'fullscreen'
    ? `fixed inset-0 z-0 overflow-hidden ${className}`
    : `absolute inset-0 overflow-hidden ${className}`;

  return (
    <div className={wrapperClass} style={{ opacity, pointerEvents: 'none' }}>
      <svg
        viewBox="-300 -100 1400 950"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: isMobile
            ? 'perspective(600px) rotateX(36deg) rotateY(-6deg) rotateZ(6deg)'
            : 'perspective(900px) rotateX(48deg) rotateY(-12deg) rotateZ(24deg)',
          transformOrigin: '50% 50%',
        }}
      >
        {/* Primary grid */}
        <g stroke="rgba(139,92,246,0.06)" strokeWidth="1.2" fill="none">
          {[60,180,300,420,560].map(y => <line key={`h1-${y}`} x1="0" y1={y} x2="1000" y2={y} />)}
          {[140,310,480,640,800,940].map(x => <line key={`v1-${x}`} x1={x} y1="0" x2={x} y2="650" />)}
        </g>

        {/* Secondary grid */}
        <g stroke="rgba(139,92,246,0.04)" strokeWidth="0.7" fill="none">
          {[120,240,360,490].map(y => <line key={`h2-${y}`} x1="0" y1={y} x2="1000" y2={y} />)}
          {[60,220,390,560,720,870].map(x => <line key={`v2-${x}`} x1={x} y1="0" x2={x} y2="650" />)}
        </g>

        {/* Tertiary grid */}
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

        {/* Junction nodes */}
        {[
          [310,180],[480,300],[640,180],[800,300],[310,420],[640,420],
          [480,120],[720,490],[220,300],[560,560],[870,180],[940,420],
        ].map(([x,y], i) => (
          <g key={`jn-${i}`}>
            <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(139,92,246,0.04)" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="3.5" fill="none" stroke="rgba(139,92,246,0.025)" strokeWidth="0.5" />
            {animate && (
              <circle cx={x} cy={y} r="2" fill="rgba(139,92,246,0.08)">
                <animate
                  attributeName="r"
                  values="2;5;2"
                  dur={`${3 + (i % 4) * 0.7}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.08;0.02;0.08"
                  dur={`${3 + (i % 4) * 0.7}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

export { BrandGrid };

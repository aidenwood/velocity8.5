import React, { useEffect, useState } from 'react';
import BrandGrid from '../brand/BrandGrid.jsx';

/**
 * Full-screen AIDXN character roll transition with branded grid background.
 * Each letter rolls in with a staggered animation over the 3D grid, then fades out.
 */
export function PageTransition({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'rolling' | 'out'>('rolling');

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('out'), 800);
    const doneTimer = setTimeout(() => onComplete?.(), 1200);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const letters = ['A', 'I', 'D', 'X', 'N'];

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center transition-opacity duration-400 ${
        phase === 'out' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#0A0A12' }}
    >
      {/* Branded grid background */}
      <BrandGrid variant="fullscreen" opacity={0.6} animate />

      {/* AIDXN text */}
      <div className="relative z-10 flex select-none gap-1 sm:gap-2">
        {letters.map((letter, i) => (
          <span
            key={letter}
            className="aidxn-roll-letter text-[18vw] font-bold leading-none tracking-tighter text-white sm:text-[14vw] md:text-[12vw]"
            style={{
              animationDelay: `${i * 80}ms`,
              opacity: 0,
            }}
          >
            {letter}
          </span>
        ))}
        {/* Dot accent */}
        <span
          className="aidxn-roll-letter text-[18vw] font-bold leading-none sm:text-[14vw] md:text-[12vw]"
          style={{
            animationDelay: `${letters.length * 80}ms`,
            opacity: 0,
            color: '#8B5CF6',
          }}
        >
          .
        </span>
      </div>

      <style>{`
        @keyframes aidxn-roll-in {
          0% {
            opacity: 0;
            transform: translateY(100%) rotateX(-90deg);
            filter: blur(8px);
          }
          60% {
            opacity: 1;
            transform: translateY(-5%) rotateX(5deg);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0);
          }
        }
        .aidxn-roll-letter {
          animation: aidxn-roll-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: inline-block;
          transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
}

export function usePageTransition() {
  const [show, setShow] = useState(false);

  const trigger = (navigateTo: string) => {
    setShow(true);
    setTimeout(() => {
      window.location.href = navigateTo;
    }, 600);
  };

  return { show, trigger, setShow };
}

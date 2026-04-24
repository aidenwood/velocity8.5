import React, { useEffect, useState } from 'react';

/**
 * Full-screen AIDXN character roll transition.
 * Each letter rolls in with a staggered animation, then the whole thing fades out.
 * Used as a suspense boundary for page transitions.
 */
export function PageTransition({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'rolling' | 'out'>('rolling');

  useEffect(() => {
    // Letters finish rolling at ~600ms, hold for 200ms, then fade out
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
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-black transition-opacity duration-400 ${
        phase === 'out' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex select-none gap-1 sm:gap-2">
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
      </div>

      {/* Dot accent */}
      <span
        className="aidxn-roll-dot absolute text-[18vw] font-bold leading-none text-primary-400 sm:text-[14vw] md:text-[12vw]"
        style={{
          animationDelay: `${letters.length * 80}ms`,
          opacity: 0,
          marginLeft: `${letters.length * 0.5}em`,
        }}
      >
        .
      </span>

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
        .aidxn-roll-dot {
          animation: aidxn-roll-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: inline-block;
          transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
}

/**
 * Hook to trigger the AIDXN page transition.
 * Returns [showTransition, triggerTransition, TransitionComponent]
 */
export function usePageTransition() {
  const [show, setShow] = useState(false);

  const trigger = (navigateTo: string) => {
    setShow(true);
    // Navigate after the animation peaks
    setTimeout(() => {
      window.location.href = navigateTo;
    }, 600);
  };

  return { show, trigger, setShow };
}

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if ?autostart=1 is present
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' || reducedMotion) {
        setIsDone(true);
        onComplete();
        return;
      }
    }

    const duration = 1600; // ms
    const intervalTime = 16;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(100, Math.round((step / steps) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 600); // let slide animation finish
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [reducedMotion, onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] pointer-events-auto flex flex-col justify-between overflow-hidden">
        {/* Split Panel Left */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: count === 100 ? '-100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#EDECE6] border-b border-[#1546D9]/15"
        />

        {/* Split Panel Right */}
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: count === 100 ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#EDECE6] border-t border-[#1546D9]/15"
        />

        {/* Center Loading Stage */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 select-none">
          <div className="relative w-28 h-28 mb-6">
            {/* Outline Tangerine */}
            <svg
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <clipPath id="preloader-clip">
                  <rect
                    x="0"
                    y={160 - (count / 100) * 160}
                    width="160"
                    height="160"
                  />
                </clipPath>
              </defs>

              {/* Background outline */}
              <path
                d="M 80 40 C 80 28, 86 20, 94 14"
                stroke="#1546D9"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 82 32 C 95 24, 114 26, 122 36 C 114 44, 96 42, 82 32 Z"
                fill="#1546D9"
              />
              <path
                d="M 80 38 
                   C 118 38, 146 64, 146 98 
                   C 146 130, 116 150, 80 150 
                   C 44 150, 14 130, 14 98 
                   C 14 64, 42 38, 80 38 Z"
                stroke="#1546D9"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Liquid fill rising up */}
              <g clipPath="url(#preloader-clip)">
                <path
                  d="M 80 38 
                     C 118 38, 146 64, 146 98 
                     C 146 130, 116 150, 80 150 
                     C 44 150, 14 130, 14 98 
                     C 14 64, 42 38, 80 38 Z"
                  fill="#F9B318"
                />
                <circle cx="80" cy="40" r="3" fill="#1546D9" />
              </g>
            </svg>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-[13px] tracking-[0.2em] font-medium text-[#1546D9] tabular-nums">
              {count.toString().padStart(3, '0')}
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#1546D9]/70">
              MIKAN · SPARKLING CITRUS
            </span>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

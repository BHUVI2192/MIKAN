import React, { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { PROCESS_STEPS } from '../../data/content';
import { Tangerine } from '../art/Tangerine';
import { VerticalBars } from '../art/VerticalBars';

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(
      PROCESS_STEPS.length - 1,
      Math.max(0, Math.floor(latest * PROCESS_STEPS.length))
    );
    setActiveStep(idx);
  });

  const getTangerineForStep = (stepIdx: number) => {
    switch (stepIdx) {
      case 0:
        return <Tangerine size={130} variant="whole" rotation={0} />;
      case 1:
        return <Tangerine size={130} variant="half" rotation={25} />;
      case 2:
        return <Tangerine size={130} variant="peel" rotation={-15} />;
      case 3:
      default:
        return <Tangerine size={130} variant="whole" rotation={45} />;
    }
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#EDECE6] text-[#1546D9] py-16 sm:py-32 px-4 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 sm:pb-10 border-b border-[#1546D9]/20 gap-2">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] block mb-1">
              THE METHOD · 05 / 07
            </span>
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[7vw] uppercase tracking-tight stretch leading-none mt-1">
              HOW IT'S MADE
            </h2>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-[#1546D9]/70 uppercase tracking-wider">
            <span>6-HR PRESS · 4°C FIZZ</span>
          </div>
        </div>

        {/* Asymmetric Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 pt-8 sm:pt-16 items-start">
          {/* Left Column: Graphic showcase */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="p-6 border-[1.5px] border-[#1546D9] bg-[#EDECE6] flex flex-col justify-between h-[220px] sm:h-[380px]">
              <div className="flex items-center justify-center flex-1">
                {getTangerineForStep(activeStep)}
              </div>
              <div className="pt-3 border-t border-[#1546D9]/20 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                  0{activeStep + 1} · {PROCESS_STEPS[activeStep].title}
                </span>
                <VerticalBars height={36} />
              </div>
            </div>
          </div>

          {/* Right Column: 4 Numbered Steps */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-16">
            {PROCESS_STEPS.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={step.number}
                  className={`transition-opacity duration-300 pb-6 sm:pb-10 border-b border-[#1546D9]/20 ${
                    isCurrent ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-1 font-mono text-xs">
                    <span className="font-bold tracking-widest">{step.number}</span>
                    <span className="opacity-70 text-[10px]">{step.altitudeOrSpec}</span>
                  </div>

                  <h3 className="font-display font-black text-4xl sm:text-6xl uppercase stretch leading-tight my-1">
                    {step.title}
                  </h3>

                  <div className="space-y-1 pt-1">
                    <p className="font-sans text-base sm:text-xl font-semibold text-[#1546D9]">
                      {step.detail}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-[#1546D9]/75 max-w-md leading-relaxed">
                      {step.subdetail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

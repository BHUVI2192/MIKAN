import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Tangerine } from '../art/Tangerine';
import { Blob } from '../art/Blob';
import { ParallaxLayer } from '../ui/ParallaxLayer';
import { RevealWords } from '../ui/RevealWords';
import { BRAND_COPY } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Statement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const smoothX = useSpring(rawX, { stiffness: 90, damping: 25 });

  const rawScaleY = useTransform(scrollYProgress, [0.2, 0.7], [1.1, 1.25]);
  const smoothScaleY = useSpring(rawScaleY, { stiffness: 90, damping: 25 });

  return (
    <section
      id="statement"
      ref={sectionRef}
      className="relative w-full min-h-[85vh] bg-[#EDECE6] text-[#1546D9] py-16 sm:py-32 px-4 sm:px-12 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background drifting fruit */}
      <ParallaxLayer
        targetRef={sectionRef}
        speed={-0.15}
        rotateSpeed={24}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <Blob seed={1} size={380} className="absolute top-[10%] -left-20 opacity-70 w-56 sm:w-96" />
        <div className="absolute top-[35%] right-[8%] sm:right-[12%]">
          <Tangerine size={90} rotation={-20} variant="peel" className="w-16 sm:w-28 h-auto" />
        </div>
      </ParallaxLayer>

      {/* Top kicker */}
      <div className="relative z-10 w-full flex items-center justify-between pb-4 sm:pb-6 border-b border-[#1546D9]/20 font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em]">
        <span>THE CREED</span>
        <span>02 / 07</span>
      </div>

      {/* Center: HUGE STATEMENT */}
      <div className="relative z-10 w-full my-auto py-8 sm:py-12">
        <motion.div
          style={{ x: !reducedMotion ? smoothX : 0 }}
          className="w-full flex flex-col gap-1 sm:gap-3"
        >
          {/* Row 1: ONE FRUIT. */}
          <div className="overflow-visible">
            <motion.h2
              style={{
                scaleY: !reducedMotion ? smoothScaleY : 1.25,
                transformOrigin: 'bottom'
              }}
              className="font-display font-black text-5xl sm:text-7xl lg:text-[10vw] leading-[0.8] tracking-tight uppercase text-[#1546D9]"
            >
              <RevealWords text="ONE FRUIT." delay={0.1} />
            </motion.h2>
          </div>

          {/* Row 2: ONE FIZZ. */}
          <div className="overflow-visible">
            <motion.h2
              style={{
                scaleY: !reducedMotion ? smoothScaleY : 1.25,
                transformOrigin: 'bottom'
              }}
              className="font-display font-black text-5xl sm:text-7xl lg:text-[10vw] leading-[0.8] tracking-tight uppercase text-[#1546D9] pl-0 sm:pl-12"
            >
              <RevealWords text="ONE FIZZ." delay={0.2} />
            </motion.h2>
          </div>

          {/* Row 3: ZERO FUSS. */}
          <div className="overflow-visible">
            <motion.h2
              style={{
                scaleY: !reducedMotion ? smoothScaleY : 1.25,
                transformOrigin: 'bottom'
              }}
              className="font-display font-black text-5xl sm:text-7xl lg:text-[10vw] leading-[0.8] tracking-tight uppercase text-[#1546D9] pl-0 sm:pl-24"
            >
              <RevealWords text="ZERO FUSS." delay={0.3} />
            </motion.h2>
          </div>
        </motion.div>
      </div>

      {/* Lower Paragraph */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pt-6 sm:pt-10 border-t border-[#1546D9]/20">
        <div className="font-mono text-[9px] sm:text-[11px] uppercase tracking-wider text-[#1546D9]/70">
          FORMULA 14 · EHIME CITRUS
        </div>
        <div className="max-w-xs sm:max-w-md text-left sm:text-right">
          <p className="font-sans text-sm sm:text-base text-[#1546D9] font-medium leading-relaxed">
            {BRAND_COPY.statementPara}
          </p>
        </div>
      </div>
    </section>
  );
};

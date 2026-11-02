import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Tangerine } from '../art/Tangerine';
import { Blob } from '../art/Blob';
import { ParallaxLayer } from '../ui/ParallaxLayer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const BigStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const rawScale = useTransform(scrollYProgress, [0.1, 0.8], [0.9, 1.1]);
  const smoothScale = useSpring(rawScale, { stiffness: 90, damping: 25 });

  return (
    <section
      id="fizz"
      ref={containerRef}
      className="relative w-full min-h-[75vh] sm:min-h-[90vh] bg-[#1546D9] text-[#EDECE6] py-20 sm:py-36 px-4 sm:px-12 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Blobs */}
      <ParallaxLayer
        targetRef={containerRef}
        speed={-0.2}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <Blob seed={2} size={420} color="#F9B318" className="absolute top-[5%] -left-24 opacity-80 w-64 sm:w-[420px]" />
      </ParallaxLayer>

      {/* Top Header */}
      <div className="relative z-10 w-full flex justify-between items-center pb-4 border-b border-[#EDECE6]/20 font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-[#EDECE6]">
        <span>ESSENCE · 06 / 07</span>
        <span>4°C FIZZ</span>
      </div>

      {/* Center Statement */}
      <div className="relative z-10 w-full my-auto py-8 flex flex-col items-center justify-center text-center">
        <motion.div
          style={{ scale: !reducedMotion ? smoothScale : 1 }}
          className="max-w-5xl mx-auto space-y-2"
        >
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[9vw] uppercase text-[#EDECE6] tracking-tight leading-[0.78] stretch origin-center">
            SOME AFTERNOONS NEED A LITTLE FIZZ.
          </h2>
          <p className="font-mono text-[10px] sm:text-xs text-[#F9B318] uppercase tracking-[0.16em] pt-2 font-semibold">
            UNFILTERED · UNSWEETENED · CRISP
          </p>
        </motion.div>
      </div>

      {/* Floating Tangerines */}
      <ParallaxLayer
        targetRef={containerRef}
        speed={0.25}
        rotateSpeed={-30}
        className="absolute inset-0 pointer-events-none z-[15]"
      >
        <div className="absolute top-[48%] right-[4%] sm:right-[14%]">
          <Tangerine size={90} variant="half" rotation={35} className="w-16 sm:w-32 h-auto" />
        </div>
        <div className="absolute bottom-[10%] left-[6%] sm:left-[12%]">
          <Tangerine size={80} variant="whole" rotation={-25} className="w-14 sm:w-28 h-auto" />
        </div>
      </ParallaxLayer>

      {/* Bottom Info */}
      <div className="relative z-10 w-full flex justify-between items-center pt-4 border-t border-[#EDECE6]/20 font-mono text-[9px] sm:text-[10px] text-[#EDECE6]/70 uppercase tracking-[0.12em]">
        <span>CITRUS OILS</span>
        <span>ZERO PRESERVATIVES</span>
      </div>
    </section>
  );
};

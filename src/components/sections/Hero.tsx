import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Tangerine } from '../art/Tangerine';
import { Blob } from '../art/Blob';
import { VerticalBars } from '../art/VerticalBars';
import { CircleButton } from '../art/CircleButton';
import { RevealLetters } from '../ui/RevealLetters';
import { ParallaxLayer } from '../ui/ParallaxLayer';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useLenis } from '../../providers/SmoothScroll';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { BRAND_COPY } from '../../data/content';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax(12);
  const { scrollTo } = useLenis();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[580px] bg-[#EDECE6] overflow-hidden flex flex-col justify-between pt-20 sm:pt-28 pb-4 sm:pb-8 px-4 sm:px-12 select-none"
    >
      {/* Layer 0: Background Blobs */}
      <ParallaxLayer
        targetRef={containerRef}
        speed={-0.18}
        scaleRange={[0.9, 1.1]}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div
          style={
            !reducedMotion
              ? {
                  transform: `translate3d(${mouse.x * -0.4}px, ${mouse.y * -0.4}px, 0)`
                }
              : undefined
          }
          className="relative w-full h-full"
        >
          {/* Top-right blob: smaller on mobile */}
          <Blob
            seed={0}
            size={480}
            className="absolute -top-16 -right-24 sm:-right-10 opacity-90 w-[280px] sm:w-[480px]"
          />
          {/* Bottom-left subtle blob */}
          <Blob
            seed={2}
            size={320}
            className="absolute bottom-6 -left-16 opacity-70 w-[200px] sm:w-[320px]"
          />
        </div>
      </ParallaxLayer>

      {/* Layer 1: Midground Behind Wordmark */}
      <ParallaxLayer
        targetRef={containerRef}
        speed={-0.1}
        rotateSpeed={16}
        className="absolute inset-0 pointer-events-none z-[2]"
      >
        <div
          style={
            !reducedMotion
              ? {
                  transform: `translate3d(${mouse.x * 0.3}px, ${mouse.y * 0.3}px, 0)`
                }
              : undefined
          }
          className="relative w-full h-full"
        >
          {/* Tangerine behind 'K' */}
          <div className="absolute top-[36%] left-[46%] -translate-x-1/2">
            <Tangerine size={120} rotation={-10} variant="whole" className="w-20 sm:w-36 h-auto" />
          </div>

          {/* Half cut top left: hidden on tiny screens to declutter */}
          <div className="hidden sm:block absolute top-[22%] left-[12%]">
            <Tangerine size={85} rotation={20} variant="half" />
          </div>
        </div>
      </ParallaxLayer>

      {/* Layer 2: Core Content & Wordmark */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
        {/* Top Meta Area */}
        <div className="w-full flex justify-between items-start gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-1 max-w-[260px] sm:max-w-sm"
          >
            <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#1546D9]">
              {BRAND_COPY.heroTagline}
            </div>
            <p className="font-sans text-[11px] sm:text-xs text-[#1546D9]/80 leading-snug">
              {BRAND_COPY.heroShortLine}
            </p>
          </motion.div>

          {/* Vertical bars graphic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden sm:flex items-center gap-4"
          >
            <div className="text-right font-mono text-[9px] uppercase tracking-wider text-[#1546D9]/70">
              EHIME CITRUS
            </div>
            <VerticalBars height={56} />
          </motion.div>
        </div>

        {/* Center: GIANT STRETCHED WORDMARK */}
        <div className="w-full my-auto py-2 flex flex-col items-center justify-center overflow-visible">
          <div
            style={
              !reducedMotion
                ? {
                    transform: `translate3d(${mouse.x * 0.6}px, ${mouse.y * 0.6}px, 0)`
                  }
                : undefined
            }
            className="w-full text-center relative"
          >
            <h1 className="font-display font-black text-[#1546D9] text-[26vw] sm:text-[22vw] leading-[0.74] tracking-[-0.02em] uppercase select-none w-full flex justify-center">
              <RevealLetters
                text="MIKAN"
                delay={0.15}
                stagger={0.05}
                letterClassName="stretch origin-bottom"
              />
            </h1>
          </div>
        </div>

        {/* Middle-Right Floating Discover Button */}
        <div className="absolute right-3 sm:right-12 bottom-16 sm:top-[60%] sm:-translate-y-1/2 z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <CircleButton
              onClick={() => scrollTo('#statement', { offset: -20 })}
              label="DISCOVER"
              direction="down"
              size={54}
              showTextLabel={false}
              ariaLabel="Scroll down to statement"
            />
          </motion.div>
        </div>

        {/* Bottom Bar: Stacked Labels */}
        <div className="w-full flex items-end justify-between pt-3 border-t border-[#1546D9]/20 font-mono text-[10px] sm:text-[11px] text-[#1546D9]">
          <div className="flex items-center gap-2 uppercase tracking-[0.12em]">
            <span className="font-bold">330 ML</span>
            <span className="opacity-40">/</span>
            <span>COLD</span>
            <span className="opacity-40">/</span>
            <span>BATCH 07</span>
          </div>

          <div className="hidden sm:block uppercase tracking-[0.14em] text-[#1546D9]/70">
            {BRAND_COPY.descriptor}
          </div>
        </div>
      </div>

      {/* Layer 3: Foreground Overlapping Elements */}
      <ParallaxLayer
        targetRef={containerRef}
        speed={0.2}
        rotateSpeed={-20}
        className="absolute inset-0 pointer-events-none z-[15]"
      >
        <div
          style={
            !reducedMotion
              ? {
                  transform: `translate3d(${mouse.x * 0.9}px, ${mouse.y * 0.9}px, 0)`
                }
              : undefined
          }
          className="relative w-full h-full"
        >
          {/* Overlapping fruit */}
          <div className="absolute top-[48%] right-[4%] sm:right-[16%]">
            <Tangerine size={90} rotation={25} variant="whole" className="w-16 sm:w-28 h-auto" />
          </div>

          {/* Peel curl bottom */}
          <div className="absolute bottom-[14%] left-[12%] sm:left-[28%]">
            <Tangerine size={80} rotation={-15} variant="peel" className="w-14 sm:w-24 h-auto" />
          </div>
        </div>
      </ParallaxLayer>
    </section>
  );
};

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Tangerine } from '../art/Tangerine';
import { INGREDIENT_CARDS } from '../../data/content';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Ingredients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  const smoothX = useSpring(rawX, { stiffness: 90, damping: 25 });

  const renderGraphic = (type: string) => {
    switch (type) {
      case 'tangerine':
        return (
          <div className="w-20 h-20 sm:w-36 sm:h-36">
            <Tangerine size="100%" variant="half" rotation={15} />
          </div>
        );
      case 'water':
        return (
          <div className="w-20 h-20 sm:w-36 sm:h-36 flex items-center justify-center">
            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
              <path
                d="M 80 20 C 80 20, 130 80, 130 115 C 130 142, 107 155, 80 155 C 53 155, 30 142, 30 115 C 30 80, 80 20, 80 20 Z"
                fill="#1546D9"
              />
              <path
                d="M 52 110 C 52 130, 64 140, 80 140"
                stroke="#EDECE6"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      case 'bubbles':
        return (
          <div className="w-20 h-20 sm:w-36 sm:h-36 flex items-center justify-center">
            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
              <circle cx="50" cy="90" r="28" fill="#1546D9" />
              <circle cx="106" cy="65" r="38" fill="#1546D9" />
              <circle cx="82" cy="120" r="18" fill="#1546D9" />
              <circle cx="118" cy="124" r="14" fill="#EDECE6" stroke="#1546D9" strokeWidth="3" />
            </svg>
          </div>
        );
      case 'pure':
      default:
        return (
          <div className="w-20 h-20 sm:w-36 sm:h-36 flex items-center justify-center">
            <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
              <circle cx="80" cy="80" r="54" stroke="#1546D9" strokeWidth="8" />
              <line x1="42" y1="42" x2="118" y2="118" stroke="#1546D9" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        );
    }
  };

  return (
    <section
      id="ingredients"
      ref={containerRef}
      className={`relative w-full bg-[#F9B318] text-[#1546D9] select-none ${
        isMobile ? 'py-14 px-4' : 'h-[300vh]'
      }`}
    >
      {!isMobile ? (
        <div className="sticky top-0 w-full h-[100svh] min-h-[580px] flex flex-col justify-between p-8 sm:p-14 overflow-hidden">
          {/* Header */}
          <div className="w-full flex justify-between items-baseline pb-4 border-b border-[#1546D9]/30">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.16em] block mb-2 font-semibold">
                WHAT'S IN IT · 04 / 07
              </span>
              <h2 className="font-display font-black text-6xl sm:text-8xl lg:text-[7vw] uppercase tracking-[-0.01em] stretch leading-none mt-2 pt-1">
                FOUR ELEMENTS
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-right">
              HORIZONTAL SCROLL →
            </span>
          </div>

          {/* Horizontal Track Container */}
          <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto">
            <motion.div
              style={{ x: !reducedMotion ? smoothX : 0 }}
              className="flex gap-6 w-[400%] shrink-0"
            >
              {INGREDIENT_CARDS.map((card) => (
                <div
                  key={card.number}
                  className="w-1/4 h-[55vh] max-h-[460px] border-2 border-[#1546D9] bg-[#F9B318] p-8 flex flex-col justify-between shrink-0"
                >
                  <div className="flex justify-between items-start font-mono text-xs">
                    <span className="font-bold text-sm">{card.number}</span>
                    <span className="opacity-80">{card.subtitle}</span>
                  </div>

                  <div className="flex items-center gap-6 my-auto">
                    {renderGraphic(card.graphicType)}
                    <div>
                      <h3 className="font-display font-black text-5xl uppercase stretch leading-tight">
                        {card.title}
                      </h3>
                      <p className="font-sans text-sm font-medium max-w-xs mt-2 leading-relaxed">
                        {card.copy}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1546D9]/30 font-mono text-[10px] uppercase opacity-85">
                    {card.subtext}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="w-full pt-3 border-t border-[#1546D9]/30 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
            <span>100% BOTANICAL</span>
            <span>ZERO SYNTHETICS</span>
          </div>
        </div>
      ) : (
        /* Mobile: Compact stacked cards */
        <div className="space-y-6">
          <div className="pb-3 border-b border-[#1546D9]/30">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] block mb-1">
              WHAT'S IN IT · 04 / 07
            </span>
            <h2 className="font-display font-black text-5xl uppercase stretch leading-tight mt-1">
              FOUR ELEMENTS
            </h2>
          </div>

          <div className="space-y-4">
            {INGREDIENT_CARDS.map((card) => (
              <div
                key={card.number}
                className="border-[1.5px] border-[#1546D9] p-4 space-y-3 bg-[#F9B318]"
              >
                <div className="flex justify-between items-start font-mono text-[10px]">
                  <span className="font-bold">{card.number}</span>
                  <span className="opacity-80">{card.subtitle}</span>
                </div>

                <div className="flex items-center gap-4">
                  {renderGraphic(card.graphicType)}
                  <div>
                    <h3 className="font-display font-black text-3xl uppercase stretch leading-none">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs font-medium leading-normal mt-1">
                      {card.copy}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1546D9]/20 font-mono text-[9px] uppercase opacity-75">
                  {card.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

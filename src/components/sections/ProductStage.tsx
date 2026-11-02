import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Can } from '../art/Can';
import { Tangerine } from '../art/Tangerine';
import { Blob } from '../art/Blob';
import { VARIANTS, VariantId } from '../../data/products';
import { useCart } from '../../providers/CartProvider';

const VARIANT_KEYS: VariantId[] = ['original', 'ginger', 'yuzu', 'zero'];

export const ProductStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(
      VARIANT_KEYS.length - 1,
      Math.max(0, Math.floor(latest * VARIANT_KEYS.length))
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const currentVariantId = VARIANT_KEYS[activeIndex];
  const variant = VARIANTS[currentVariantId];

  // Background color mapping
  const bgColors = ['#EDECE6', '#F9B318', '#1546D9', '#DEDCD3'];
  const activeBg = bgColors[activeIndex];
  const isDark = currentVariantId === 'yuzu';
  const textColor = isDark ? '#EDECE6' : '#1546D9';

  return (
    <section
      id="flavours"
      ref={containerRef}
      className="relative w-full h-[320vh] sm:h-[400vh]"
    >
      {/* Sticky Fullscreen Stage */}
      <div
        style={{
          backgroundColor: activeBg,
          color: textColor,
          transition: 'background-color 0.4s ease, color 0.3s ease'
        }}
        className="sticky top-0 w-full h-[100svh] min-h-[580px] flex flex-col justify-between pt-16 sm:pt-12 pb-4 sm:pb-8 px-4 sm:px-12 overflow-hidden select-none"
      >
        {/* Top Bar: Progress Line, Variant Switcher, Index */}
        <div className="relative z-20 w-full flex items-center justify-between pb-2 sm:pb-4 border-b border-current/20 font-mono text-[9px] sm:text-xs uppercase tracking-[0.14em]">
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-bold">FLAVOURS</span>
            <span className="opacity-40">/</span>
            <span className="opacity-75">0{activeIndex + 1}</span>
          </div>

          {/* Interactive variant pill selector */}
          <div className="flex items-center gap-1 sm:gap-2">
            {VARIANT_KEYS.map((key, i) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`px-2 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider rounded-full border transition-all ${
                  activeIndex === i
                    ? 'border-current font-bold bg-current/15'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>

          <div className="tabular-nums font-bold">
            0{activeIndex + 1} / 04
          </div>
        </div>

        {/* Orbiting Blobs and Tangerines */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`blob-${currentVariantId}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-[20%] left-[28%] -translate-x-1/2 -translate-y-1/2"
            >
              <Blob
                seed={activeIndex}
                size={340}
                color={activeIndex === 1 ? '#EDECE6' : '#F9B318'}
                className="w-48 sm:w-80 h-auto"
              />
            </motion.div>
          </AnimatePresence>

          <div className="hidden sm:block absolute bottom-[20%] left-[12%]">
            <Tangerine
              size={100}
              rotation={activeIndex * 45}
              variant={activeIndex % 2 === 0 ? 'whole' : 'half'}
            />
          </div>
        </div>

        {/* Main Stage Grid: Responsive for Mobile and Desktop */}
        <div className="relative z-10 w-full flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-center justify-center my-auto py-2">
          {/* Top/Left: Variant Name & Brief Copy */}
          <div className="w-full lg:col-span-4 flex flex-col justify-center text-center lg:text-left order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-1 sm:space-y-2"
              >
                <div className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.16em] opacity-75 block mb-1">
                  {variant.subtitle}
                </div>
                <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[5vw] uppercase tracking-tight leading-none stretch origin-bottom mt-1.5 pt-1">
                  {variant.name}
                </h2>
                <p className="font-sans text-[11px] sm:text-xs opacity-90 max-w-xs mx-auto lg:mx-0 pt-1 leading-snug">
                  {variant.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center: The Can (Dynamically scaled on mobile) */}
          <div className="w-full lg:col-span-4 flex items-center justify-center order-2 py-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id}
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <Can
                  variant={variant.id}
                  width={140}
                  height={270}
                  className="sm:w-[190px] sm:h-[370px] drop-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom/Right: Tasting Notes & Add Button */}
          <div className="w-full lg:col-span-4 flex flex-col justify-center items-center lg:items-start order-3 space-y-2 sm:space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-2 font-mono text-[10px] sm:text-xs w-full max-w-xs text-center lg:text-left"
              >
                {/* Compact Tasting line */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 opacity-85">
                  {variant.tastingNotes.map((note, idx) => (
                    <span key={idx} className="border border-current/30 px-2 py-0.5 text-[9px] uppercase">
                      {note}
                    </span>
                  ))}
                </div>

                {/* Energy & Juice */}
                <div className="flex justify-around lg:justify-start lg:gap-6 pt-1 text-[10px] opacity-75">
                  <span>{variant.calories}</span>
                  <span>·</span>
                  <span>{variant.nutrition.juice}</span>
                </div>

                {/* Add to cart quick button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      addItem(variant.id, '12-pack', 1);
                      openCart();
                    }}
                    className={`w-full sm:w-auto px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-wider font-semibold border ${
                      isDark
                        ? 'border-[#EDECE6] bg-[#EDECE6] text-[#1546D9] hover:bg-[#F9B318]'
                        : 'border-[#1546D9] bg-[#1546D9] text-[#EDECE6] hover:bg-[#F9B318] hover:text-[#1546D9]'
                    } transition-colors cursor-pointer`}
                  >
                    ADD 12-PACK →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="relative z-20 w-full pt-3 border-t border-current/20 flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.14em]">
          <span>330ML CAN</span>
          <div className="w-28 sm:w-64 h-[2px] bg-current/20 relative overflow-hidden">
            <motion.div
              style={{
                width: `${((activeIndex + 1) / VARIANT_KEYS.length) * 100}%`
              }}
              className="h-full bg-current transition-all duration-300"
            />
          </div>
          <span>COLD PRESSED</span>
        </div>
      </div>
    </section>
  );
};

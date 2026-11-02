import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Cursor: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer:fine and when reduced motion is not active
    if (typeof window === 'undefined' || reducedMotion) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor') || '';
        setCursorText(customText);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, isVisible, cursorX, cursorY]);

  if (reducedMotion || !isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%'
      }}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center transition-[width,height,background-color] duration-200 ease-out select-none ${
        isHovered
          ? cursorText
            ? 'w-[72px] h-[72px] bg-[#1546D9] text-[#EDECE6]'
            : 'w-10 h-10 bg-[#1546D9] opacity-90'
          : 'w-3 h-3 bg-[#1546D9]'
      }`}
    >
      {isHovered && cursorText && (
        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#EDECE6] pointer-events-none text-center leading-tight">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
};

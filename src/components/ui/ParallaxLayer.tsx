import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 to +0.35 (-20% to +35% of viewport height)
  rotateSpeed?: number; // degrees of rotation across viewport scroll e.g. 15 or -30
  scaleRange?: [number, number]; // e.g. [0.9, 1.15]
  className?: string;
  style?: React.CSSProperties;
  targetRef?: React.RefObject<HTMLElement | null>;
  offset?: ['start end', 'end start'] | ['start start', 'end start'] | [string, string];
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0,
  rotateSpeed = 0,
  scaleRange,
  className = '',
  style = {},
  targetRef,
  offset = ['start end', 'end start'] as ['start end', 'end start']
}) => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll(
    targetRef
      ? { target: targetRef, offset: offset as any }
      : { offset: offset as any }
  );

  // Dampen multiplier on mobile: 40% of desktop range. 0 on reduced motion.
  const mobileMultiplier = isMobile ? 0.4 : 1.0;
  const effectiveSpeed = reducedMotion ? 0 : speed * mobileMultiplier;
  const effectiveRotate = reducedMotion ? 0 : rotateSpeed * mobileMultiplier;

  // Window height approximation in viewport percentage
  // Map progress [0, 1] to translateY in pixels (~[-300, 300])
  const yDistance = effectiveSpeed * 800; // approximate viewport delta
  const rawY = useTransform(scrollYProgress, [0, 1], [-yDistance / 2, yDistance / 2]);
  const smoothY = useSpring(rawY, { stiffness: 90, damping: 25, mass: 0.8 });

  const rawRotate = useTransform(scrollYProgress, [0, 1], [-effectiveRotate / 2, effectiveRotate / 2]);
  const smoothRotate = useSpring(rawRotate, { stiffness: 80, damping: 24 });

  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleRange && !reducedMotion ? scaleRange : [1, 1]
  );
  const smoothScale = useSpring(rawScale, { stiffness: 90, damping: 25 });

  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      style={{
        ...style,
        y: smoothY,
        rotate: effectiveRotate !== 0 ? smoothRotate : undefined,
        scale: scaleRange ? smoothScale : undefined
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

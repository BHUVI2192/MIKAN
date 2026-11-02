import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealLettersProps {
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export const RevealLetters: React.FC<RevealLettersProps> = ({
  text,
  className = '',
  letterClassName = '',
  delay = 0.2,
  stagger = 0.05,
  as = 'div'
}) => {
  const reducedMotion = useReducedMotion();
  const letters = Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : stagger,
        delayChildren: delay
      }
    }
  };

  const letterVariants = {
    hidden: {
      y: reducedMotion ? 0 : '110%',
      opacity: reducedMotion ? 0 : 1
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.3 : 1.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`inline-flex flex-wrap overflow-hidden ${className}`}
      aria-label={text}
    >
      {letters.map((char, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden pb-1"
          style={{ verticalAlign: 'bottom' }}
        >
          <motion.span
            variants={letterVariants}
            className={`inline-block ${letterClassName}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  italicWord?: string; // Optional accent word in Fraunces italic
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export const RevealWords: React.FC<RevealWordsProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0.1,
  stagger = 0.08,
  italicWord,
  as = 'div'
}) => {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : stagger,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: {
      y: reducedMotion ? 0 : '120%',
      opacity: reducedMotion ? 0 : 1
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.3 : 1.0,
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
      className={`flex flex-wrap gap-x-[0.25em] gap-y-1 overflow-hidden ${className}`}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase();
        const isItalic = italicWord && cleanWord === italicWord.toLowerCase();

        return (
          <span
            key={index}
            className="inline-block overflow-hidden pb-1 leading-none"
            style={{ verticalAlign: 'bottom' }}
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block ${
                isItalic ? 'font-serif-accent italic font-normal text-[0.9em] lowercase' : ''
              } ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </MotionComponent>
  );
};

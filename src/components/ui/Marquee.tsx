import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap select-none flex ${className}`} aria-hidden="true">
      <div className="flex shrink-0 animate-[marquee_24s_linear_infinite] gap-8 items-center">
        {children}
      </div>
      <div className="flex shrink-0 animate-[marquee_24s_linear_infinite] gap-8 items-center" aria-hidden="true">
        {children}
      </div>
    </div>
  );
};

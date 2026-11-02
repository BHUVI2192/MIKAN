import React from 'react';

interface VerticalBarsProps {
  height?: number | string;
  className?: string;
  color?: string;
  bars?: Array<{ width: number; heightPercent?: number; opacity?: number }>;
}

export const VerticalBars: React.FC<VerticalBarsProps> = ({
  height = '100%',
  className = '',
  color = '#1546D9',
  bars = [
    { width: 1.5, heightPercent: 100 },
    { width: 2.5, heightPercent: 88 },
    { width: 1, heightPercent: 96 },
    { width: 3, heightPercent: 78 },
    { width: 1.5, heightPercent: 92 },
    { width: 4, heightPercent: 100 },
    { width: 2, heightPercent: 84 },
    { width: 1.5, heightPercent: 90 },
    { width: 5, heightPercent: 70 },
    { width: 1.5, heightPercent: 100 }
  ]
}) => {
  return (
    <div
      className={`inline-flex items-end justify-between select-none pointer-events-none gap-2 sm:gap-3 ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {bars.map((bar, index) => (
        <div
          key={index}
          style={{
            width: `${bar.width}px`,
            height: `${bar.heightPercent ?? 100}%`,
            backgroundColor: color,
            opacity: bar.opacity ?? 1
          }}
          className="transition-all duration-700 origin-bottom"
        />
      ))}
    </div>
  );
};

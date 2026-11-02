import React from 'react';

export type TangerineVariant = 'whole' | 'half' | 'peel';

interface TangerineProps {
  size?: number | string;
  rotation?: number;
  variant?: TangerineVariant;
  className?: string;
  ariaHidden?: boolean;
}

export const Tangerine: React.FC<TangerineProps> = ({
  size = 120,
  rotation = 0,
  variant = 'whole',
  className = '',
  ariaHidden = true
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`select-none transition-transform duration-300 ${className}`}
      aria-hidden={ariaHidden}
      role="img"
    >
      {variant === 'whole' && (
        <g>
          {/* Cobalt Stem */}
          <path
            d="M 80 40 C 80 28, 86 20, 94 14"
            stroke="#1546D9"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Cobalt Leaf */}
          <path
            d="M 82 32 C 95 24, 114 26, 122 36 C 114 44, 96 42, 82 32 Z"
            fill="#1546D9"
          />
          {/* Leaf vein */}
          <path
            d="M 85 33 C 98 32, 108 34, 116 36"
            stroke="#EDECE6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Tangerine Body: slightly flattened top circle */}
          <path
            d="M 80 38 
               C 118 38, 146 64, 146 98 
               C 146 130, 116 150, 80 150 
               C 44 150, 14 130, 14 98 
               C 14 64, 42 38, 80 38 Z"
            fill="#F9B318"
          />
          {/* Top dimple */}
          <circle cx="80" cy="40" r="3" fill="#1546D9" />
          {/* Beige highlight arc */}
          <path
            d="M 36 78 C 34 88, 36 102, 46 116"
            stroke="#EDECE6"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Subtle secondary highlight */}
          <path
            d="M 46 64 C 42 70, 40 76, 40 82"
            stroke="#EDECE6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      )}

      {variant === 'half' && (
        <g>
          {/* Outer rind border */}
          <circle cx="80" cy="80" r="66" fill="#F9B318" stroke="#1546D9" strokeWidth="3" />
          {/* White/Beige pith ring */}
          <circle cx="80" cy="80" r="56" fill="#EDECE6" />
          {/* Segments: 8 flat yellow segments */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <g key={i} transform={`rotate(${angle} 80 80)`}>
                <path
                  d="M 80 72 
                     L 80 32 
                     C 94 34, 104 42, 110 52 
                     L 86 76 
                     Z"
                  fill="#F9B318"
                />
                {/* Micro juice vesicles line */}
                <line
                  x1="88"
                  y1="50"
                  x2="96"
                  y2="58"
                  stroke="#EDECE6"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
          {/* Center core */}
          <circle cx="80" cy="80" r="9" fill="#EDECE6" />
          <circle cx="80" cy="80" r="4" fill="#1546D9" />
        </g>
      )}

      {variant === 'peel' && (
        <g>
          {/* Swirling peeled strip */}
          <path
            d="M 30 130 
               C 10 110, 20 70, 50 50 
               C 85 30, 130 40, 140 75 
               C 148 105, 115 130, 85 135 
               C 60 140, 45 125, 55 105 
               C 65 85, 95 85, 105 95 
               C 112 102, 110 114, 100 120"
            fill="none"
            stroke="#F9B318"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cobalt outer edge outline */}
          <path
            d="M 30 130 
               C 10 110, 20 70, 50 50 
               C 85 30, 130 40, 140 75 
               C 148 105, 115 130, 85 135 
               C 60 140, 45 125, 55 105 
               C 65 85, 95 85, 105 95 
               C 112 102, 110 114, 100 120"
            fill="none"
            stroke="#1546D9"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Beige inner pith highlight */}
          <path
            d="M 38 126 
               C 22 108, 30 74, 56 56 
               C 88 38, 124 46, 132 76 
               C 138 100, 110 122, 85 127"
            fill="none"
            stroke="#EDECE6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Small dropped leaf */}
          <path
            d="M 125 120 C 135 110, 148 112, 150 122 C 142 128, 130 128, 125 120 Z"
            fill="#1546D9"
          />
        </g>
      )}
    </svg>
  );
};

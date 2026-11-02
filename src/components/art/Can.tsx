import React from 'react';
import { VariantId } from '../../data/products';

interface CanProps {
  variant?: VariantId;
  width?: number | string;
  height?: number | string;
  className?: string;
  ariaLabel?: string;
}

export const Can: React.FC<CanProps> = ({
  variant = 'original',
  width = 220,
  height = 420,
  className = '',
  ariaLabel
}) => {
  // Variant color definitions
  const configs = {
    original: {
      bodyFill: '#1546D9', // Cobalt body
      bandFill: '#EDECE6', // Beige band
      bandText: '#1546D9', // Cobalt "MIKAN"
      accentMark: '#F9B318', // Yellow tangerine
      rimFill: '#DEDCD3',
      subText: '#1546D9',
      flavorTag: 'ORIGINAL TANGERINE',
      specs: '330ML · 28% JUICE'
    },
    ginger: {
      bodyFill: '#F9B318', // Yellow body
      bandFill: '#1546D9', // Cobalt band
      bandText: '#EDECE6', // Beige "MIKAN"
      accentMark: '#EDECE6', // Beige tangerine
      rimFill: '#DEDCD3',
      subText: '#EDECE6',
      flavorTag: 'TANGERINE + GINGER',
      specs: '330ML · FRESH ROOT'
    },
    yuzu: {
      bodyFill: '#EDECE6', // Beige body
      bandFill: '#F9B318', // Sun yellow band for high contrast against cobalt background
      bandText: '#1546D9', // Cobalt "MIKAN"
      accentMark: '#1546D9', // Cobalt tangerine
      rimFill: '#DEDCD3',
      subText: '#1546D9',
      flavorTag: 'TANGERINE + YUZU',
      specs: '330ML · MOUNTAIN CITRUS'
    },
    zero: {
      bodyFill: '#1546D9', // Cobalt body
      bandFill: '#F9B318', // Yellow band
      bandText: '#1546D9', // Cobalt "MIKAN"
      accentMark: '#EDECE6', // Beige mark
      rimFill: '#DEDCD3',
      subText: '#1546D9',
      flavorTag: 'ZERO SUGAR · ESSENCE',
      specs: '330ML · 2 KCAL'
    }
  };

  const c = configs[variant] || configs.original;

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={ariaLabel || `MIKAN ${c.flavorTag} 330ml Can`}
    >
      <svg
        viewBox="0 0 240 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-none"
      >
        {/* Top Rim & Tab Assembly */}
        {/* Top lid rim outer */}
        <ellipse cx="120" cy="30" rx="94" ry="14" fill={c.rimFill} stroke="#1546D9" strokeWidth="2.5" />
        {/* Top lid recessed surface */}
        <ellipse cx="120" cy="28" rx="84" ry="10" fill="#EDECE6" stroke="#1546D9" strokeWidth="1.5" />
        {/* Can tab */}
        <path
          d="M 112 24 L 128 24 L 132 32 L 108 32 Z"
          fill="#DEDCD3"
          stroke="#1546D9"
          strokeWidth="1.5"
        />
        <circle cx="120" cy="28" r="2.5" fill="#1546D9" />

        {/* Can Chime (tapered shoulder) */}
        <path
          d="M 26 50 
             C 26 36, 40 30, 120 30 
             C 200 30, 214 36, 214 50 
             L 214 62 
             L 26 62 Z"
          fill={c.rimFill}
          stroke="#1546D9"
          strokeWidth="2.5"
        />

        {/* Main Can Cylinder Body */}
        <rect
          x="26"
          y="60"
          width="188"
          height="350"
          rx="0"
          fill={c.bodyFill}
          stroke="#1546D9"
          strokeWidth="2.5"
        />

        {/* Flat Graphic Band */}
        <rect
          x="26"
          y="120"
          width="188"
          height="210"
          fill={c.bandFill}
          stroke="#1546D9"
          strokeWidth="2"
        />

        {/* Band Hairline Accents */}
        <line x1="26" y1="126" x2="214" y2="126" stroke="#1546D9" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="26" y1="324" x2="214" y2="324" stroke="#1546D9" strokeWidth="1" strokeDasharray="3 3" />

        {/* Graphic Tangerine Icon on Band */}
        <g transform="translate(100, 138) scale(0.25)">
          {/* Stem & Leaf */}
          <path d="M 80 40 C 80 28, 86 20, 94 14" stroke="#1546D9" strokeWidth="6" strokeLinecap="round" />
          <path d="M 82 32 C 95 24, 114 26, 122 36 C 114 44, 96 42, 82 32 Z" fill="#1546D9" />
          {/* Body */}
          <path
            d="M 80 38 C 118 38, 146 64, 146 98 C 146 130, 116 150, 80 150 C 44 150, 14 130, 14 98 C 14 64, 42 38, 80 38 Z"
            fill={c.accentMark}
          />
        </g>

        {/* Display Wordmark "MIKAN" on Band (Vertically stretched tall letters) */}
        <text
          x="120"
          y="238"
          textAnchor="middle"
          fill={c.bandText}
          style={{
            fontFamily: '"Big Shoulders Display", "Anton", sans-serif',
            fontSize: '56px',
            fontWeight: 900,
            letterSpacing: '0.02em',
            transform: 'scale(1, 1.3)',
            transformOrigin: '120px 210px'
          }}
        >
          MIKAN
        </text>

        {/* Descriptor under MIKAN */}
        <text
          x="120"
          y="266"
          textAnchor="middle"
          fill={c.subText}
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '8.5px',
            fontWeight: 500,
            letterSpacing: '0.18em'
          }}
        >
          {c.flavorTag}
        </text>

        {/* Spec line */}
        <text
          x="120"
          y="298"
          textAnchor="middle"
          fill={c.subText}
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '7.5px',
            fontWeight: 400,
            letterSpacing: '0.14em'
          }}
        >
          {c.specs}
        </text>

        {/* Bottom Chime (tapered heel) */}
        <path
          d="M 26 410 
             L 214 410 
             C 214 430, 190 442, 120 442 
             C 50 442, 26 430, 26 410 Z"
          fill={c.rimFill}
          stroke="#1546D9"
          strokeWidth="2.5"
        />
        {/* Bottom base rim */}
        <ellipse cx="120" cy="442" rx="70" ry="8" fill="#EDECE6" stroke="#1546D9" strokeWidth="2" />
      </svg>
    </div>
  );
};

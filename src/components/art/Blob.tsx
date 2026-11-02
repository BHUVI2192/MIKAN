import React from 'react';

interface BlobProps {
  seed?: number;
  size?: number | string;
  color?: string;
  className?: string;
  ariaHidden?: boolean;
}

// 4 distinct organic deterministic blob SVG curves
const BLOB_PATHS = [
  // Seed 0: Asymmetric bulbous sun blob
  'M 140 30 C 220 10, 270 90, 260 170 C 250 250, 180 290, 100 270 C 20 250, -10 170, 20 90 C 50 10, 80 40, 140 30 Z',
  // Seed 1: Stretched oblique ovaloid blob
  'M 160 20 C 240 30, 280 120, 270 200 C 260 280, 170 285, 90 260 C 10 235, -5 140, 30 70 C 65 0, 110 10, 160 20 Z',
  // Seed 2: Flowing droplet-like blob
  'M 120 15 C 200 -5, 275 60, 265 150 C 255 240, 195 285, 125 280 C 55 275, 15 210, 15 130 C 15 50, 60 30, 120 15 Z',
  // Seed 3: Horizontal soft pillowy cloud blob
  'M 150 40 C 230 20, 280 100, 260 180 C 240 260, 160 270, 90 250 C 20 230, 0 160, 20 80 C 40 0, 90 55, 150 40 Z'
];

export const Blob: React.FC<BlobProps> = ({
  seed = 0,
  size = 300,
  color = '#F9B318',
  className = '',
  ariaHidden = true
}) => {
  const path = BLOB_PATHS[Math.abs(seed) % BLOB_PATHS.length];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      aria-hidden={ariaHidden}
    >
      <path d={path} fill={color} />
    </svg>
  );
};

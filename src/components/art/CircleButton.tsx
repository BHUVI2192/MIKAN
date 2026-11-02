import React from 'react';

interface CircleButtonProps {
  onClick?: () => void;
  href?: string;
  label?: string;
  ariaLabel?: string;
  size?: number; // 56 to 72
  direction?: 'down' | 'right' | 'up';
  className?: string;
  showTextLabel?: boolean;
}

export const CircleButton: React.FC<CircleButtonProps> = ({
  onClick,
  href,
  label,
  ariaLabel,
  size = 64,
  direction = 'down',
  className = '',
  showTextLabel = true
}) => {
  const getRotation = () => {
    switch (direction) {
      case 'down':
        return 'rotate-90';
      case 'up':
        return '-rotate-90';
      case 'right':
      default:
        return 'rotate-0';
    }
  };

  const buttonContent = (
    <div
      className={`group relative inline-flex items-center gap-3.5 select-none focus-visible:outline-none ${className}`}
    >
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="rounded-full border-[1.5px] border-[#1546D9] bg-transparent flex items-center justify-center transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[#1546D9] group-focus-visible:ring-2 group-focus-visible:ring-[#1546D9] group-focus-visible:ring-offset-2 shrink-0"
      >
        {/* Thin crisp arrow in pure SVG */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform ${getRotation()} transition-transform duration-300 transition-colors duration-300 stroke-[#1546D9] group-hover:stroke-[#EDECE6]`}
        >
          <line x1="4" y1="12" x2="20" y2="12" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 6L20 12L14 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {label && showTextLabel && (
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#1546D9] group-hover:underline underline-offset-4 font-medium">
          {label}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={ariaLabel || label || 'Navigate'}
        className="inline-block cursor-pointer"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label || 'Action'}
      className="inline-block cursor-pointer bg-transparent border-none p-0 text-left"
    >
      {buttonContent}
    </button>
  );
};

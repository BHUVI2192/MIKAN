import { useEffect, useState } from 'react';

export function useMouseParallax(maxOffset = 12) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on desktop pointer:fine
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const normalizedY = (e.clientY / innerHeight) * 2 - 1;
      targetX = normalizedX * maxOffset;
      targetY = normalizedY * maxOffset;
    };

    const update = () => {
      // Smooth lerp
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setOffset({ x: Math.round(currentX * 100) / 100, y: Math.round(currentY * 100) / 100 });
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [maxOffset]);

  return offset;
}

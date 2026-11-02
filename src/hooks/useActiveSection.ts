import { useEffect, useState } from 'react';

export interface SectionMeta {
  id: string;
  index: number;
  label: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 'hero', index: 1, label: 'Hero' },
  { id: 'statement', index: 2, label: 'Statement' },
  { id: 'flavours', index: 3, label: 'Flavours' },
  { id: 'ingredients', index: 4, label: 'Ingredients' },
  { id: 'process', index: 5, label: 'Craft' },
  { id: 'fizz', index: 6, label: 'Essence' },
  { id: 'buy', index: 7, label: 'Shop' }
];

export function useActiveSection(): {
  activeId: string;
  activeNumber: string;
  totalSections: string;
  sections: SectionMeta[];
} {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveId(SECTIONS[i].id);
            return;
          }
        }
      }
      setActiveId('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);
  const currentNum = (activeIndex >= 0 ? activeIndex + 1 : 1).toString().padStart(2, '0');
  const totalNum = SECTIONS.length.toString().padStart(2, '0');

  return {
    activeId,
    activeNumber: currentNum,
    totalSections: totalNum,
    sections: SECTIONS
  };
}

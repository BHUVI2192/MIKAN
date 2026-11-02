import React from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLenis } from '../../providers/SmoothScroll';

export const SectionCounter: React.FC = () => {
  const { activeId, activeNumber, totalSections, sections } = useActiveSection();
  const { scrollTo } = useLenis();

  return (
    <>
      {/* Bottom Left: Stacked list of section names with active one underlined */}
      <div
        className="fixed bottom-12 left-6 z-40 hidden md:flex flex-col gap-1 select-none pointer-events-auto bg-[#EDECE6]/95 border border-[#1546D9]/30 p-3 shadow-none backdrop-blur-none"
        aria-label="Section navigation"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#1546D9]/60 mb-1 border-b border-[#1546D9]/20 pb-1 font-bold">
          INDEX
        </span>
        {sections.map((sec) => {
          const isActive = sec.id === activeId;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollTo(`#${sec.id}`, { offset: -20 })}
              className={`text-left font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#1546D9] font-bold underline underline-offset-2 decoration-1.5'
                  : 'text-[#1546D9]/45 hover:text-[#1546D9]'
              }`}
            >
              0{sec.index} {sec.label}
            </button>
          );
        })}
      </div>

      {/* Bottom Right: Tiny mono counter "01 / 07" */}
      <div
        className="fixed bottom-6 right-6 z-40 select-none pointer-events-none"
        aria-label={`Current section ${activeNumber} of ${totalSections}`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EDECE6]/85 backdrop-blur-none border border-[#1546D9]/30">
          <span className="font-mono text-[11px] font-bold text-[#1546D9] tracking-[0.14em] tabular-nums">
            {activeNumber}
          </span>
          <span className="font-mono text-[10px] text-[#1546D9]/50">/</span>
          <span className="font-mono text-[11px] font-medium text-[#1546D9]/60 tracking-[0.14em] tabular-nums">
            {totalSections}
          </span>
        </div>
      </div>
    </>
  );
};

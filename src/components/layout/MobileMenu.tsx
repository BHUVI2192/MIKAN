import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SECTIONS } from '../../hooks/useActiveSection';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'statement', label: 'ABOUT' },
    { id: 'flavours', label: 'FLAVOURS' },
    { id: 'ingredients', label: 'INGREDIENTS' },
    { id: 'process', label: 'CRAFT' },
    { id: 'buy', label: 'SHOP' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-[#1546D9] text-[#EDECE6] flex flex-col justify-between p-6 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#EDECE6]/80">
              MIKAN · MENU
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="font-mono text-xs uppercase tracking-[0.12em] text-[#EDECE6] px-3 py-1.5 border border-[#EDECE6]/40 rounded-full hover:bg-[#EDECE6] hover:text-[#1546D9] transition-colors"
            >
              CLOSE [ESC]
            </button>
          </div>

          {/* Stretched Links */}
          <div className="flex flex-col gap-4 my-auto">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.08 * index,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className="block group"
                >
                  <div className="flex items-baseline justify-between border-b border-[#EDECE6]/20 pb-3">
                    <span className="font-display text-5xl sm:text-7xl uppercase font-black tracking-tight stretch origin-bottom group-hover:text-[#F9B318] transition-colors">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-[#EDECE6]/60">
                      0{index + 1}
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Bottom info */}
          <div className="pt-6 border-t border-[#EDECE6]/20 flex items-center justify-between font-mono text-[11px] text-[#EDECE6]/70">
            <span>SPARKLING TANGERINE</span>
            <span>SETUCHI · EHIME</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

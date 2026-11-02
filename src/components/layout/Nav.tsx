import React, { useState } from 'react';
import { useCart } from '../../providers/CartProvider';
import { useLenis } from '../../providers/SmoothScroll';
import { MobileMenu } from './MobileMenu';

export const Nav: React.FC = () => {
  const { summary, openCart } = useCart();
  const { scrollTo } = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollTo(`#${targetId}`, { offset: -20 });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-5 transition-colors duration-300 pointer-events-none"
        role="banner"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 pointer-events-auto">
          {/* Left Zone: Pill HOME + Mono Links */}
          <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main navigation">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="px-3.5 py-1 rounded-full border-[1.5px] border-[#1546D9] font-mono text-[11px] font-medium tracking-[0.12em] text-[#1546D9] uppercase hover:bg-[#1546D9] hover:text-[#EDECE6] transition-colors duration-200"
            >
              HOME
            </a>
            <div className="hidden sm:flex items-center gap-6">
              <a
                href="#statement"
                onClick={(e) => handleNavClick(e, 'statement')}
                className="font-mono text-[11px] font-medium tracking-[0.12em] text-[#1546D9] uppercase hover:underline underline-offset-4 decoration-1 transition-all"
              >
                ABOUT
              </a>
              <a
                href="#flavours"
                onClick={(e) => handleNavClick(e, 'flavours')}
                className="font-mono text-[11px] font-medium tracking-[0.12em] text-[#1546D9] uppercase hover:underline underline-offset-4 decoration-1 transition-all"
              >
                FLAVOURS
              </a>
              <a
                href="#ingredients"
                onClick={(e) => handleNavClick(e, 'ingredients')}
                className="font-mono text-[11px] font-medium tracking-[0.12em] text-[#1546D9] uppercase hover:underline underline-offset-4 decoration-1 transition-all"
              >
                INGREDIENTS
              </a>
              <a
                href="#buy"
                onClick={(e) => handleNavClick(e, 'buy')}
                className="font-mono text-[11px] font-medium tracking-[0.12em] text-[#1546D9] uppercase hover:underline underline-offset-4 decoration-1 transition-all"
              >
                SHOP
              </a>
            </div>
          </nav>

          {/* Right Zone: Cart & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Cart Button */}
            <button
              type="button"
              onClick={openCart}
              data-cursor="Cart"
              aria-label={`Shopping cart with ${summary.itemsCount} items`}
              className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#1546D9] px-3 py-1 hover:underline underline-offset-4 decoration-1 transition-all flex items-center gap-1.5"
            >
              <span>CART</span>
              <span className="tabular-nums">({summary.itemsCount})</span>
            </button>

            {/* Mobile Hamburger: 2 clean lines */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
              className="sm:hidden flex flex-col justify-center gap-1.5 w-8 h-8 px-1 py-1 focus-visible:outline-none"
            >
              <span className="w-full h-[1.5px] bg-[#1546D9] transition-transform" />
              <span className="w-full h-[1.5px] bg-[#1546D9] transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={(targetId) => {
          setMobileMenuOpen(false);
          scrollTo(`#${targetId}`, { offset: 0 });
        }}
      />
    </>
  );
};

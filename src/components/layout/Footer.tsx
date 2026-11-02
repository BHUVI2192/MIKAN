import React, { useState } from 'react';
import { BRAND_COPY, STOCKISTS } from '../../data/content';
import { CircleButton } from '../art/CircleButton';
import { useLenis } from '../../providers/SmoothScroll';

export const Footer: React.FC = () => {
  const { scrollTo } = useLenis();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Enter a valid email.');
      return;
    }
    setStatus('success');
    setErrorMessage('');
  };

  return (
    <footer
      className="relative bg-[#1546D9] text-[#EDECE6] pt-14 sm:pt-24 pb-0 overflow-hidden select-none"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        {/* Top Row: Newsletter + Back to Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 sm:pb-14 border-b border-[#EDECE6]/20 items-start">
          {/* Newsletter */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#EDECE6]/60 block font-semibold">
              DISPATCHES
            </span>
            <h3 className="font-display text-3xl sm:text-5xl font-extrabold uppercase stretch text-[#EDECE6] leading-none">
              THE GROVE
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#EDECE6]/80 max-w-sm">
              {BRAND_COPY.footerNewsletterNotice}
            </p>

            <form onSubmit={handleSubscribe} className="max-w-xs sm:max-w-sm pt-1">
              <div className="flex items-end gap-3 border-b border-[#EDECE6]/60 pb-1.5 focus-within:border-[#F9B318] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Your email address"
                  aria-label="Email address for newsletter"
                  className="w-full bg-transparent text-[#EDECE6] placeholder-[#EDECE6]/40 font-mono text-xs focus:outline-none"
                  disabled={status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'success'}
                  className="font-mono text-xs uppercase tracking-wider text-[#EDECE6] font-semibold hover:text-[#F9B318] transition-colors cursor-pointer shrink-0"
                >
                  {status === 'success' ? 'JOINED' : 'JOIN →'}
                </button>
              </div>

              {status === 'error' && (
                <p className="font-mono text-[10px] text-[#F9B318] mt-1.5">
                  {errorMessage}
                </p>
              )}
              {status === 'success' && (
                <p className="font-mono text-[10px] text-[#EDECE6] mt-1.5 font-medium">
                  ✓ Subscribed. First dispatch with Batch 08.
                </p>
              )}
            </form>
          </div>

          {/* Back to top & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end gap-4 h-full">
            <div className="flex items-center gap-3">
              <CircleButton
                onClick={() => scrollTo(0)}
                label="TOP"
                direction="up"
                size={50}
                ariaLabel="Scroll back to top"
                className="[&_span]:text-[#EDECE6] [&_div]:border-[#EDECE6] [&_svg]:stroke-[#EDECE6] [&_div]:hover:bg-[#EDECE6] [&_div]:hover:[&_svg]:stroke-[#1546D9]"
              />
            </div>
            <div className="font-mono text-[10px] text-[#EDECE6]/60 text-left lg:text-right">
              <p>Mikan Works Ltd · Ehime 790-0004</p>
            </div>
          </div>
        </div>

        {/* Middle Navigation Columns: 2 Columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 sm:py-12 border-b border-[#EDECE6]/20 font-mono text-[11px]">
          <div>
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#EDECE6]/50 block mb-2.5">
              SHOP
            </span>
            <ul className="space-y-1.5">
              <li><a href="#buy" onClick={(e) => { e.preventDefault(); scrollTo('#buy'); }} className="hover:text-[#F9B318]">Original</a></li>
              <li><a href="#buy" onClick={(e) => { e.preventDefault(); scrollTo('#buy'); }} className="hover:text-[#F9B318]">Ginger</a></li>
              <li><a href="#buy" onClick={(e) => { e.preventDefault(); scrollTo('#buy'); }} className="hover:text-[#F9B318]">Yuzu</a></li>
              <li><a href="#buy" onClick={(e) => { e.preventDefault(); scrollTo('#buy'); }} className="hover:text-[#F9B318]">Zero Sugar</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#EDECE6]/50 block mb-2.5">
              ABOUT
            </span>
            <ul className="space-y-1.5">
              <li><a href="#statement" onClick={(e) => { e.preventDefault(); scrollTo('#statement'); }} className="hover:text-[#F9B318]">Philosophy</a></li>
              <li><a href="#ingredients" onClick={(e) => { e.preventDefault(); scrollTo('#ingredients'); }} className="hover:text-[#F9B318]">Ingredients</a></li>
              <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('#process'); }} className="hover:text-[#F9B318]">Pressing</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#EDECE6]/50 block mb-2.5">
              STOCKISTS
            </span>
            <ul className="space-y-1.5">
              {STOCKISTS.map((s, idx) => (
                <li key={idx} className="text-[#EDECE6]/80 text-[10px]">
                  <span className="text-[#F9B318]">{s.city}</span> · {s.venue}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#EDECE6]/50 block mb-2.5">
              CONNECT
            </span>
            <ul className="space-y-1.5">
              <li><a href="mailto:groves@mikan-soda.jp" className="hover:text-[#F9B318]">groves@mikan.jp</a></li>
              <li><a href="#hero" className="hover:text-[#F9B318]">Instagram</a></li>
              <li><a href="#hero" className="hover:text-[#F9B318]">Wholesale</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-2 font-mono text-[9px] text-[#EDECE6]/50">
          <span>© 2026 MIKAN BEVERAGE WORKS</span>
          <span>TERMS · PRIVACY</span>
        </div>
      </div>

      {/* Massive Stretched MIKAN Wordmark cropped at bottom */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none mt-2 -mb-6 sm:-mb-12">
        <h2 className="text-center font-display font-black text-[#EDECE6] tracking-tight leading-[0.7] text-[26vw] stretch uppercase whitespace-nowrap">
          MIKAN
        </h2>
      </div>
    </footer>
  );
};

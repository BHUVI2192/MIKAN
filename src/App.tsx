/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SmoothScrollProvider } from './providers/SmoothScroll';
import { CartProvider } from './providers/CartProvider';
import { Cursor } from './components/layout/Cursor';
import { Preloader } from './components/layout/Preloader';
import { Nav } from './components/layout/Nav';
import { CartDrawer } from './components/layout/CartDrawer';
import { SectionCounter } from './components/layout/SectionCounter';
import { Footer } from './components/layout/Footer';

import { Hero } from './components/sections/Hero';
import { Statement } from './components/sections/Statement';
import { ProductStage } from './components/sections/ProductStage';
import { Ingredients } from './components/sections/Ingredients';
import { Process } from './components/sections/Process';
import { BigStatement } from './components/sections/BigStatement';
import { Buy } from './components/sections/Buy';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScrollProvider>
      <CartProvider>
        {/* Preloader overlay on entry */}
        <Preloader onComplete={() => setPreloaderDone(true)} />

        {/* Custom cursor (desktop pointer:fine only) */}
        <Cursor />

        {/* Global minimal Navigation */}
        <Nav />

        {/* Accessible Main Content */}
        <main id="main-content" className="relative w-full">
          {/* 01 — Hero */}
          <Hero />

          {/* 02 — The Statement */}
          <Statement />

          {/* 03 — Sticky Product Stage (Color-shifting) */}
          <ProductStage />

          {/* 04 — Ingredients (Yellow field with horizontal stage) */}
          <Ingredients />

          {/* 05 — How It's Made (Asymmetric timeline & vertical bars) */}
          <Process />

          {/* 06 — Full-Bleed Cobalt Statement */}
          <BigStatement />

          {/* 07 — Purchase Direct */}
          <Buy />
        </main>

        {/* 08 — Full-bleed Footer with giant cropped MIKAN */}
        <Footer />

        {/* Persistent Page Progress (01 / 07) & Index */}
        <SectionCounter />

        {/* Slide-over Cart Drawer */}
        <CartDrawer />
      </CartProvider>
    </SmoothScrollProvider>
  );
}

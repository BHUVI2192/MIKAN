import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Can } from '../art/Can';
import { VARIANTS, PACK_OPTIONS, VariantId } from '../../data/products';
import { formatPrice } from '../../utils/cartRules';
import { useCart } from '../../providers/CartProvider';

const VARIANT_LIST: VariantId[] = ['original', 'ginger', 'yuzu', 'zero'];

export const Buy: React.FC = () => {
  const { addItem, openCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<VariantId>('original');
  const [selectedPack, setSelectedPack] = useState<'6-pack' | '12-pack' | '24-pack'>('12-pack');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const variant = VARIANTS[selectedVariant];
  const currentPack = PACK_OPTIONS.find((p) => p.id === selectedPack) || PACK_OPTIONS[1];
  const totalPrice = currentPack.totalPrice * quantity;

  const handleAddToCart = () => {
    addItem(selectedVariant, selectedPack, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 3000);
  };

  return (
    <section
      id="buy"
      className="relative w-full bg-[#EDECE6] text-[#1546D9] py-16 sm:py-32 px-4 sm:px-12 select-none border-b border-[#1546D9]/20"
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 sm:pb-8 border-b border-[#1546D9]/20 gap-2">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] block mb-2 font-semibold">
              ORDER DIRECT · 07 / 07
            </span>
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[7vw] uppercase tracking-tight stretch leading-none mt-2 pt-1">
              BATCH 07
            </h2>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-[#1546D9]/75 uppercase tracking-wider">
            <span>COLD EXPEDITED · FREE OVER $40</span>
          </div>
        </div>

        {/* 2-Column Purchase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-start">
          {/* Left Column: Can Preview + 4 Variant Tiles */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            {/* Can Stage */}
            <div className="border-[1.5px] border-[#1546D9] bg-[#EDECE6] p-4 sm:p-8 flex flex-col items-center justify-center relative min-h-[280px] sm:min-h-[420px]">
              <div className="absolute top-3 left-3 font-mono text-[10px] uppercase text-[#1546D9]/60">
                {variant.batch} · {variant.volume}
              </div>
              <div className="absolute top-3 right-3 font-mono text-[10px] uppercase font-semibold">
                {variant.nutrition.juice}
              </div>

              {/* Animated Can */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedVariant}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="py-2"
                >
                  <Can
                    variant={selectedVariant}
                    width={150}
                    height={280}
                    className="sm:w-[190px] sm:h-[360px]"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="w-full pt-3 border-t border-[#1546D9]/20 flex justify-between font-mono text-[9px] sm:text-[10px] uppercase text-[#1546D9]/75">
                <span>{variant.name}</span>
                <span>{variant.calories}</span>
              </div>
            </div>

            {/* 4 Variant Tiles */}
            <div className="grid grid-cols-4 gap-2">
              {VARIANT_LIST.map((key) => {
                const item = VARIANTS[key];
                const isSelected = selectedVariant === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedVariant(key)}
                    className={`p-2 border-[1.5px] border-[#1546D9] text-left transition-colors duration-200 cursor-pointer flex flex-col justify-between h-20 sm:h-24 ${
                      isSelected
                        ? 'bg-[#F9B318] text-[#1546D9] font-bold'
                        : 'bg-[#EDECE6] hover:bg-[#DEDCD3]/50 text-[#1546D9]'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase opacity-60">
                      0{VARIANT_LIST.indexOf(key) + 1}
                    </span>
                    <span className="font-display text-sm sm:text-base uppercase leading-tight stretch block">
                      {item.name}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider opacity-75">
                      {isSelected ? '●' : 'SELECT'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Pack Options & Stepper */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1 pb-4 border-b border-[#1546D9]/20">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#1546D9]/70 font-semibold block mb-2">
                {variant.subtitle}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-5xl uppercase stretch leading-tight mt-2 pt-1">
                {variant.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#1546D9]/80 leading-relaxed pt-1">
                {variant.description}
              </p>
            </div>

            {/* Pack Options List */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold block text-[#1546D9]/70">
                PACK CONFIGURATION
              </span>
              <div className="space-y-2">
                {PACK_OPTIONS.map((pack) => {
                  const isSelected = selectedPack === pack.id;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setSelectedPack(pack.id)}
                      className={`w-full p-3 sm:p-4 border-[1.5px] border-[#1546D9] text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1546D9] text-[#EDECE6]'
                          : 'bg-[#EDECE6] hover:bg-[#DEDCD3]/60 text-[#1546D9]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          {pack.label}
                        </span>
                        {pack.popular && (
                          <span className={`font-mono text-[9px] uppercase px-1.5 py-0.5 border ${
                            isSelected ? 'border-[#F9B318] text-[#F9B318]' : 'border-[#1546D9] text-[#1546D9]'
                          }`}>
                            POPULAR
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-sm sm:text-base font-bold tabular-nums">
                          {formatPrice(pack.totalPrice)}
                        </span>
                        <span className="font-mono text-[9px] block opacity-70">
                          {formatPrice(pack.pricePerCan)} / can
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border-[1.5px] border-[#1546D9] divide-x-[1.5px] divide-[#1546D9] h-12 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-3 h-full hover:bg-[#1546D9] hover:text-[#EDECE6] transition-colors"
                  >
                    –
                  </button>
                  <span className="px-4 h-full flex items-center justify-center font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="px-3 h-full hover:bg-[#1546D9] hover:text-[#EDECE6] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#1546D9] text-[#EDECE6] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#F9B318] hover:text-[#1546D9] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ADD TO CART</span>
                  <span>·</span>
                  <span className="tabular-nums">{formatPrice(totalPrice)}</span>
                </button>
              </div>

              {/* Confirmation Toast */}
              <div aria-live="polite" className="min-h-[24px]">
                {addedSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 bg-[#F9B318]/25 border border-[#F9B318] flex items-center justify-between font-mono text-[11px] text-[#1546D9]"
                  >
                    <span>✓ Added {quantity}× {variant.name} ({currentPack.label})</span>
                    <button
                      type="button"
                      onClick={openCart}
                      className="underline font-bold uppercase text-[10px]"
                    >
                      VIEW CART →
                    </button>
                  </motion.div>
                )}
              </div>

              <div className="p-2.5 border border-[#1546D9]/20 font-mono text-[10px] text-[#1546D9]/80 flex justify-between">
                <span>Free delivery over $40</span>
                <span>Cold pack shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../providers/CartProvider';
import { formatPrice } from '../../utils/cartRules';

export const CartDrawer: React.FC = () => {
  const {
    items,
    summary,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  useEffect(() => {
    if (!isCartOpen) {
      setCheckoutComplete(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] overflow-hidden" role="dialog" aria-modal="true" aria-label="Cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#1546D9]/40"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#EDECE6] text-[#1546D9] border-l border-[#1546D9] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#1546D9]/20">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold uppercase stretch">YOUR CART</span>
                <span className="font-mono text-xs text-[#1546D9]/70">({summary.itemsCount})</span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart drawer"
                className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-[#1546D9] rounded-full hover:bg-[#1546D9] hover:text-[#EDECE6] transition-colors"
              >
                CLOSE [✕]
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 py-6 space-y-4">
              {checkoutComplete ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full border-2 border-[#1546D9] mx-auto flex items-center justify-center font-display text-3xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-display text-3xl font-black uppercase stretch">ORDER CONFIRMED</h3>
                  <p className="font-mono text-xs text-[#1546D9]/80 max-w-xs mx-auto">
                    Batch #07 allocation reserved. Cold packs dispatched within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      setCheckoutComplete(false);
                      closeCart();
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#1546D9] text-[#EDECE6] font-mono text-xs uppercase tracking-wider rounded-none hover:bg-[#1546D9]/90 transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <p className="font-mono text-sm uppercase text-[#1546D9]/70">Your cart is empty.</p>
                  <p className="font-sans text-xs text-[#1546D9]/60 max-w-xs mx-auto">
                    Select a variant and pack size below to reserve cold-pressed cans.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-[#1546D9]/25 bg-[#DEDCD3]/40 flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-display text-xl font-bold uppercase stretch leading-tight">
                            {item.variantName}
                          </h4>
                          <span className="font-mono text-[11px] text-[#1546D9]/70">
                            {item.packLabel} · {item.canCount} cans
                          </span>
                        </div>
                        <span className="font-mono text-sm font-semibold tabular-nums">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#1546D9]/15">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#1546D9] divide-x divide-[#1546D9] font-mono text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 hover:bg-[#1546D9] hover:text-[#EDECE6] transition-colors"
                            aria-label={`Decrease quantity of ${item.variantName}`}
                          >
                            –
                          </button>
                          <span className="px-3 py-1 font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 hover:bg-[#1546D9] hover:text-[#EDECE6] transition-colors"
                            aria-label={`Increase quantity of ${item.variantName}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="font-mono text-[10px] uppercase text-[#1546D9]/60 hover:text-[#1546D9] underline transition-colors"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Summary & Checkout */}
            {!checkoutComplete && items.length > 0 && (
              <div className="pt-4 border-t border-[#1546D9]/20 space-y-3 font-mono text-xs">
                {/* Shipping notice */}
                <div className="p-2.5 bg-[#F9B318]/20 border border-[#F9B318] text-[#1546D9] text-[11px]">
                  {summary.isFreeShipping ? (
                    <span className="font-bold">✓ FREE EXPEDITED COLD DELIVERY UNLOCKED</span>
                  ) : (
                    <span>Add {formatPrice(summary.freeShippingGap)} more for free cold shipping</span>
                  )}
                </div>

                <div className="flex justify-between text-xs text-[#1546D9]/80">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold">{formatPrice(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#1546D9]/80">
                  <span>Cold Shipping</span>
                  <span className="tabular-nums font-semibold">
                    {summary.shipping === 0 ? 'FREE' : formatPrice(summary.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1546D9] pt-2 border-t border-[#1546D9]/20">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(summary.total)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutComplete(true)}
                  className="w-full mt-3 py-3.5 bg-[#1546D9] text-[#EDECE6] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#F9B318] hover:text-[#1546D9] transition-colors duration-200"
                >
                  DISPATCH ORDER ({formatPrice(summary.total)})
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

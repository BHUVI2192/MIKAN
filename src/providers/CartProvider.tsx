import React, { createContext, useContext, useState, useMemo } from 'react';
import { VariantId, VARIANTS, PACK_OPTIONS } from '../data/products';
import {
  CartItem,
  OrderSummary,
  calculateOrderSummary,
  getPackPrice,
  getPackCanCount
} from '../utils/cartRules';

interface CartContextType {
  items: CartItem[];
  summary: OrderSummary;
  isCartOpen: boolean;
  lastAddedNotification: string | null;
  addItem: (variantId: VariantId, packId: '6-pack' | '12-pack' | '24-pack', quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  dismissNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedNotification, setLastAddedNotification] = useState<string | null>(null);

  const summary = useMemo(() => calculateOrderSummary(items), [items]);

  const addItem = (
    variantId: VariantId,
    packId: '6-pack' | '12-pack' | '24-pack',
    quantity: number = 1
  ) => {
    if (quantity <= 0) return;
    const variant = VARIANTS[variantId];
    const pack = PACK_OPTIONS.find((p) => p.id === packId);
    if (!variant || !pack) return;

    const itemId = `${variantId}-${packId}`;
    const unitPrice = getPackPrice(packId);
    const canCount = getPackCanCount(packId);

    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          variantId,
          variantName: variant.name,
          packId,
          packLabel: pack.label,
          canCount,
          unitPrice,
          quantity
        }
      ];
    });

    setLastAddedNotification(`Added ${quantity}× ${variant.name} (${pack.label}) to cart`);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const dismissNotification = () => setLastAddedNotification(null);

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        isCartOpen,
        lastAddedNotification,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        dismissNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

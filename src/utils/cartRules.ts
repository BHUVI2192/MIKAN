import { VariantId, PACK_OPTIONS, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../data/products';

export interface CartItem {
  id: string; // e.g. "original-12-pack"
  variantId: VariantId;
  variantName: string;
  packId: '6-pack' | '12-pack' | '24-pack';
  packLabel: string;
  canCount: number;
  unitPrice: number;
  quantity: number;
}

export interface OrderSummary {
  itemsCount: number;
  totalCans: number;
  subtotal: number;
  shipping: number;
  total: number;
  isFreeShipping: boolean;
  freeShippingGap: number;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function getPackPrice(packId: '6-pack' | '12-pack' | '24-pack'): number {
  const pack = PACK_OPTIONS.find((p) => p.id === packId);
  return pack ? pack.totalPrice : 0;
}

export function getPackCanCount(packId: '6-pack' | '12-pack' | '24-pack'): number {
  const pack = PACK_OPTIONS.find((p) => p.id === packId);
  return pack ? pack.cans : 6;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function calculateShipping(subtotal: number, threshold: number = FREE_SHIPPING_THRESHOLD): number {
  if (subtotal <= 0) return 0;
  return subtotal >= threshold ? 0 : STANDARD_SHIPPING_FEE;
}

export function getFreeShippingRemaining(subtotal: number, threshold: number = FREE_SHIPPING_THRESHOLD): number {
  if (subtotal >= threshold) return 0;
  return Math.max(0, threshold - subtotal);
}

export function calculateOrderSummary(
  items: CartItem[],
  threshold: number = FREE_SHIPPING_THRESHOLD
): OrderSummary {
  const subtotal = calculateSubtotal(items);
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCans = items.reduce((sum, item) => sum + item.canCount * item.quantity, 0);
  const shipping = calculateShipping(subtotal, threshold);
  const isFreeShipping = subtotal >= threshold;
  const freeShippingGap = getFreeShippingRemaining(subtotal, threshold);
  const total = subtotal + shipping;

  return {
    itemsCount,
    totalCans,
    subtotal,
    shipping,
    total,
    isFreeShipping,
    freeShippingGap
  };
}

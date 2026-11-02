import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateShipping,
  getFreeShippingRemaining,
  calculateOrderSummary,
  CartItem
} from './cartRules';

test('calculateSubtotal sums up item unit price multiplied by quantity', () => {
  const items: CartItem[] = [
    {
      id: 'original-6-pack',
      variantId: 'original',
      variantName: 'Original Tangerine',
      packId: '6-pack',
      packLabel: '6-Pack',
      canCount: 6,
      unitPrice: 21.0,
      quantity: 1
    },
    {
      id: 'ginger-12-pack',
      variantId: 'ginger',
      variantName: 'Tangerine + Ginger',
      packId: '12-pack',
      packLabel: '12-Pack (Case)',
      canCount: 12,
      unitPrice: 36.0,
      quantity: 2
    }
  ];

  const subtotal = calculateSubtotal(items);
  assert.equal(subtotal, 21.0 + 36.0 * 2); // 93.00
});

test('calculateShipping charges standard fee below threshold and is free at or above threshold', () => {
  assert.equal(calculateShipping(0), 0);
  assert.equal(calculateShipping(21.0), 6.0);
  assert.equal(calculateShipping(39.99), 6.0);
  assert.equal(calculateShipping(40.0), 0);
  assert.equal(calculateShipping(66.0), 0);
});

test('getFreeShippingRemaining reports correct difference', () => {
  assert.equal(getFreeShippingRemaining(21.0), 19.0);
  assert.equal(getFreeShippingRemaining(40.0), 0);
  assert.equal(getFreeShippingRemaining(50.0), 0);
});

test('calculateOrderSummary yields complete breakdown', () => {
  const items: CartItem[] = [
    {
      id: 'yuzu-12-pack',
      variantId: 'yuzu',
      variantName: 'Tangerine + Yuzu',
      packId: '12-pack',
      packLabel: '12-Pack (Case)',
      canCount: 12,
      unitPrice: 36.0,
      quantity: 1
    }
  ];

  const summary = calculateOrderSummary(items);
  assert.equal(summary.itemsCount, 1);
  assert.equal(summary.totalCans, 12);
  assert.equal(summary.subtotal, 36.0);
  assert.equal(summary.shipping, 6.0);
  assert.equal(summary.total, 42.0);
  assert.equal(summary.isFreeShipping, false);
  assert.equal(summary.freeShippingGap, 4.0);
});

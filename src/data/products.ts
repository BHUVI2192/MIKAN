export type VariantId = 'original' | 'ginger' | 'yuzu' | 'zero';

export interface ProductVariant {
  id: VariantId;
  name: string;
  subtitle: string;
  headline: string;
  colorName: string;
  accentBg: string;
  textColor: string;
  canBodyColor: string;
  canBandColor: string;
  canAccentColor: string;
  tastingNotes: string[];
  calories: string;
  ingredients: string[];
  batch: string;
  volume: string;
  description: string;
  nutrition: {
    sugar: string;
    sodium: string;
    caffeine: string;
    juice: string;
  };
}

export interface PackOption {
  id: '6-pack' | '12-pack' | '24-pack';
  cans: number;
  label: string;
  pricePerCan: number;
  totalPrice: number;
  savings?: string;
  popular?: boolean;
}

export const VARIANTS: Record<VariantId, ProductVariant> = {
  original: {
    id: 'original',
    name: 'Original',
    subtitle: 'Pure Citrus',
    headline: 'GOLD STANDARD',
    colorName: 'Beige Canvas',
    accentBg: '#EDECE6',
    textColor: '#1546D9',
    canBodyColor: '#1546D9',
    canBandColor: '#EDECE6',
    canAccentColor: '#F9B318',
    tastingNotes: ['Sun peel', 'Crisp zest', 'Dry fizz'],
    calories: '42 kcal',
    ingredients: ['Spring water', 'Tangerine juice (28%)'],
    batch: 'Batch 07',
    volume: '330 ml',
    description: 'Whole cold-pressed Ehime citrus. Crisp, dry, unfiltered.',
    nutrition: {
      sugar: '8.4g',
      sodium: '0mg',
      caffeine: '0mg',
      juice: '28% Juice'
    }
  },
  ginger: {
    id: 'ginger',
    name: 'Ginger',
    subtitle: 'Wild Heat',
    headline: 'SUN & SPICE',
    colorName: 'Sun Yellow',
    accentBg: '#F9B318',
    textColor: '#1546D9',
    canBodyColor: '#F9B318',
    canBandColor: '#1546D9',
    canAccentColor: '#EDECE6',
    tastingNotes: ['Fresh root', 'Bright citrus', 'Warm bite'],
    calories: '46 kcal',
    ingredients: ['Spring water', 'Tangerine juice (24%)', 'Kochi ginger (4%)'],
    batch: 'Batch 04',
    volume: '330 ml',
    description: 'Slow-pressed ginger root brewed with cold juice. Sharp and fiery.',
    nutrition: {
      sugar: '7.8g',
      sodium: '0mg',
      caffeine: '0mg',
      juice: '24% Juice + 4% Ginger'
    }
  },
  yuzu: {
    id: 'yuzu',
    name: 'Yuzu',
    subtitle: 'Mountain Sharp',
    headline: 'AROMATIC CRACKLE',
    colorName: 'Deep Cobalt',
    accentBg: '#1546D9',
    textColor: '#EDECE6',
    canBodyColor: '#EDECE6',
    canBandColor: '#F9B318',
    canAccentColor: '#1546D9',
    tastingNotes: ['Mountain zest', 'Honeysuckle', 'Mineral snap'],
    calories: '39 kcal',
    ingredients: ['Spring water', 'Tangerine juice (22%)', 'Yuzu juice (6%)'],
    batch: 'Batch 09',
    volume: '330 ml',
    description: 'Tokushima mountain yuzu meets sweet citrus. Highly aromatic and dry.',
    nutrition: {
      sugar: '7.1g',
      sodium: '0mg',
      caffeine: '0mg',
      juice: '28% Citrus'
    }
  },
  zero: {
    id: 'zero',
    name: 'Zero Sugar',
    subtitle: 'Essence & Fizz',
    headline: 'CITRUS OIL ONLY',
    colorName: 'Pure Linen',
    accentBg: '#DEDCD3',
    textColor: '#1546D9',
    canBodyColor: '#1546D9',
    canBandColor: '#F9B318',
    canAccentColor: '#EDECE6',
    tastingNotes: ['Peel essence', 'Mandarin leaf', 'Zero sugar'],
    calories: '2 kcal',
    ingredients: ['Spring water', 'Distilled tangerine peel essence', 'Citric acid'],
    batch: 'Batch 12',
    volume: '330 ml',
    description: 'Distilled peel oil in high-pressure micro-bubbles. Crisp and light.',
    nutrition: {
      sugar: '0g',
      sodium: '0mg',
      caffeine: '0mg',
      juice: 'Steam Essence'
    }
  }
};

export const PACK_OPTIONS: PackOption[] = [
  {
    id: '6-pack',
    cans: 6,
    label: '6-Pack',
    pricePerCan: 3.50,
    totalPrice: 21.00,
    savings: 'Sampler'
  },
  {
    id: '12-pack',
    cans: 12,
    label: '12-Pack',
    pricePerCan: 3.00,
    totalPrice: 36.00,
    popular: true,
    savings: 'Save $6'
  },
  {
    id: '24-pack',
    cans: 24,
    label: '24-Pack',
    pricePerCan: 2.75,
    totalPrice: 66.00,
    savings: 'Save $18 · Free delivery'
  }
];

export const FREE_SHIPPING_THRESHOLD = 40.0;
export const STANDARD_SHIPPING_FEE = 6.0;

export interface ProcessStep {
  number: string;
  title: string;
  detail: string;
  subdetail: string;
  altitudeOrSpec: string;
}

export interface IngredientCard {
  number: string;
  title: string;
  subtitle: string;
  copy: string;
  subtext: string;
  graphicType: 'tangerine' | 'water' | 'bubbles' | 'pure';
}

export const BRAND_COPY = {
  brandName: 'MIKAN',
  descriptor: 'Sparkling tangerine, nothing else.',
  tagline: 'Small moments, big flavour.',
  batchNumber: 'Batch 07',
  canSpecs: '330 ml / Glass-cold / Batch 07',
  heroTagline: 'SMALL MOMENTS / BIG FLAVOUR',
  heroShortLine: 'One ingredient. Unfiltered and cold.',
  statement: 'ONE FRUIT. ONE FIZZ. ZERO FUSS.',
  statementPara:
    "Cold juice, spring water, carbonation. That's the entire list.",
  bigStatement: 'SOME AFTERNOONS NEED A LITTLE FIZZ.',
  footerNewsletterNotice: 'One email a month. Just citrus.'
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'PICKED',
    detail: 'Ehime groves, in winter.',
    subdetail: 'Harvested when sun-sugar peaks on sea cliff terraces.',
    altitudeOrSpec: 'Ehime · 140m alt'
  },
  {
    number: '02',
    title: 'PRESSED',
    detail: 'Pressed in 6 hours.',
    subdetail: 'Gentle pneumatic press captures peel oil without bitter pith.',
    altitudeOrSpec: '1.2 bar cold press'
  },
  {
    number: '03',
    title: 'CHILLED',
    detail: 'Fussed at 4°C.',
    subdetail: 'Granite spring water charged with high-density fine bubbles.',
    altitudeOrSpec: '4.2 vol CO₂'
  },
  {
    number: '04',
    title: 'POURED',
    detail: 'Infinitely recyclable can.',
    subdetail: 'Light-tight raw aluminum protects fresh vitamin C.',
    altitudeOrSpec: '100% aluminum'
  }
];

export const INGREDIENT_CARDS: IngredientCard[] = [
  {
    number: '01',
    title: 'TANGERINE',
    subtitle: 'Cold-pressed',
    copy: 'Whole Ehime fruit. Peel oils and golden juice. Never concentrate.',
    subtext: 'Citrus unshiu',
    graphicType: 'tangerine'
  },
  {
    number: '02',
    title: 'WATER',
    subtitle: 'Granite filtered',
    copy: 'High-mountain spring water. Soft mineral backbone, zero chlorine.',
    subtext: 'pH 7.4',
    graphicType: 'water'
  },
  {
    number: '03',
    title: 'BUBBLES',
    subtitle: 'Tight fizz',
    copy: 'High-pressure micro-bubbles. Bracing champagne-tight sparkle.',
    subtext: '4.2 Vol CO₂',
    graphicType: 'bubbles'
  },
  {
    number: '04',
    title: 'ZERO MORE',
    subtitle: 'No fillers',
    copy: 'No cane sugar, no citric powder, no flavorings. Pure fruit.',
    subtext: 'Zero additives',
    graphicType: 'pure'
  }
];

export const STOCKISTS = [
  { city: 'Tokyo', venue: 'Daikanyama T-Site' },
  { city: 'Kyoto', venue: 'Ace Hotel' },
  { city: 'London', venue: 'Prufrock' },
  { city: 'New York', venue: 'Moro Market' }
];

export type DiamondShape = 'Oval' | 'Round' | 'Emerald' | 'Pear' | 'Cushion' | 'Princess' | 'Heart' | 'Marquise' | 'Not Sure';
export type CaratRange = '0.5 - 1 carat' | '1 - 2 carat' | '2 - 3 carat' | 'Not Sure';
export type GoldColor = 'Yellow Gold' | 'White Gold' | 'Rose Gold' | 'Not Sure';
export type JewelryStyle = 'Solitaire' | 'Hidden Halo' | 'Halo' | 'Pave' | 'Three Stone' | 'Not Sure';
export type BudgetRange = 'Under ₹50,000' | '₹50,000 - ₹1,00,000' | '₹1,00,000 - ₹2,00,000' | 'Above ₹2,00,000' | 'Not Specified' | 'Not Sure';
export type Category = 'Ring' | 'Earring' | 'Necklace' | 'Bangle' | 'Mangalsutra' | 'Not Sure';

export interface JewelryItem {
  id: string;
  name: string;
  image: string;
  shape: DiamondShape;
  carat: CaratRange;
  goldColor: GoldColor;
  style: JewelryStyle;
  price: number;
  productUrl: string;
  description?: string;
}

export interface FinderState {
  step: number;
  category?: Category;
  shape?: DiamondShape;
  carat?: CaratRange;
  goldColor?: GoldColor;
  style?: JewelryStyle;
  budget?: BudgetRange;
}

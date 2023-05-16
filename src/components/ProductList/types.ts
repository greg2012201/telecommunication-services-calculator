import type { TProduct, TSummaryItem } from '../../types';

export type ItemToAddProps = {
  id: string;
  name: string;
  price: number;
  selectedYear: string;
  productKey: string;
  includedProducts?: string[];
};

export type ListItemProps = Pick<
  TProduct,
  'id' | 'name' | 'price' | 'description' | 'productKey'
> & {
  handleAddItem({
    id,
    price,
    selectedYear,
    productKey,
    includedProducts,
    name,
  }: ItemToAddProps): void;
} & {
  includedProducts?: string[];
  isActive: boolean;
  summaryItems?: TSummaryItem[];
};

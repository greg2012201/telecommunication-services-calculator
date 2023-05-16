import type { TProduct, TSummaryItem } from '../../../types';

export type UpdaterProps = {
  itemToAdd: TSummaryItem;
  products: TProduct[];
  summaryItems: TSummaryItem[];
};

export type Commands = {
  addPackageFromRelatedItems: boolean;
  addPackageItem: boolean;
  addNonPackageItem: boolean;
};

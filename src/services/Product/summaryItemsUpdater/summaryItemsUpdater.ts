import type { TSummaryItem } from '../../../types';
import { isSummaryItem } from '../../../types/utils';
import type { UpdaterProps } from './types';
import { arePackagesRelated, getCommands, getPackage } from './utils';

function summaryItemsUpdater({
  itemToAdd,
  products,
  summaryItems,
}: UpdaterProps): TSummaryItem[] {
  const { addPackageFromRelatedItems, addPackageItem, addNonPackageItem } = getCommands({
    itemToAdd,
    products,
    summaryItems,
  });

  if (addPackageFromRelatedItems) {
    const gotPackage = getPackage({
      itemToAdd,
      products,
      summaryItems,
    });
    if (!isSummaryItem(gotPackage)) {
      return [];
    }
    return [
      ...summaryItems.filter(
        (item) =>
          !arePackagesRelated(gotPackage, item) &&
          gotPackage.id !== item.id &&
          gotPackage.selectedYear !== item.selectedYear &&
          gotPackage?.includedProducts &&
          !gotPackage?.includedProducts.includes(item.productKey),
      ),
      gotPackage,
    ];
  }
  if (addPackageItem) {
    return [
      ...summaryItems.filter((item) => {
        return (
          !arePackagesRelated(itemToAdd, item) &&
          itemToAdd.id !== item.id &&
          itemToAdd?.includedProducts &&
          !itemToAdd?.includedProducts.includes(item.productKey)
        );
      }),
      itemToAdd,
    ];
  }
  if (addNonPackageItem) {
    return [
      ...summaryItems.filter(
        (item) => itemToAdd.id !== item.id && itemToAdd.selectedYear,
      ),
      itemToAdd,
    ];
  }
  // default
  return summaryItems;
}

export default summaryItemsUpdater;

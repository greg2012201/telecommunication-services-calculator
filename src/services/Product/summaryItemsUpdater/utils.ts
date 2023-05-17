import { productDataAdapter } from '..';
import type { TSummaryItem } from '../../../types';
import type { Commands, UpdaterProps } from './types';

export function isArrayPartOfArray<T>(arr: T[], subArr: T[]): boolean {
  return subArr.every((val) => arr.includes(val));
}

export function hasEqualYears({
  itemToAdd,
  summaryItems,
}: Pick<UpdaterProps, 'itemToAdd' | 'summaryItems'>): boolean {
  return summaryItems
    .filter((item) => item.id !== itemToAdd.id)
    .map((item) => item.selectedYear)
    .every((selectedYear) => selectedYear === itemToAdd.selectedYear);
}

export function isPackage(itemToAdd: TSummaryItem): boolean {
  return !!itemToAdd?.includedProducts?.length;
}

export function arePackagesRelated(itemToAdd: TSummaryItem, itemFromList: TSummaryItem) {
  return (
    itemFromList.includedProducts &&
    itemFromList.includedProducts.some(
      (productKey) =>
        itemToAdd.includedProducts && itemToAdd.includedProducts.includes(productKey),
    )
  );
}

export function isPartOfThePackage({
  itemToAdd,
  products,
  summaryItems,
}: UpdaterProps): boolean {
  const { packages } = productDataAdapter(products);
  const arr = summaryItems.map((item) => {
    return item.productKey;
  });
  return packages.some((packageItem) => {
    return isArrayPartOfArray<string>(
      [...new Set([...arr, itemToAdd.productKey])],
      packageItem.includedProducts,
    );
  });
}
export function getCommands({
  itemToAdd,
  products,
  summaryItems,
}: UpdaterProps): Commands {
  return {
    addPackageFromRelatedItems:
      isPartOfThePackage({ itemToAdd, products, summaryItems }) &&
      hasEqualYears({
        itemToAdd,
        summaryItems: summaryItems.filter((item) => !item?.includedProducts),
      }),
    addPackageItem: isPackage(itemToAdd),
    addNonPackageItem: !isInSummaryItemPackage(itemToAdd, summaryItems),
  };
}

export function isInSummaryItemPackage(
  itemToAdd: TSummaryItem,
  summaryItems: TSummaryItem[],
) {
  const packages = summaryItems.filter((item) => !!item?.includedProducts);
  return (
    !!packages?.length &&
    packages
      .filter((item) => item.selectedYear === itemToAdd.selectedYear)
      .map((item) => item.includedProducts)
      .some(
        (includedProducts) =>
          includedProducts && includedProducts.includes(itemToAdd.productKey),
      )
  );
}
export function getPackage({
  itemToAdd,
  products,
  summaryItems,
}: UpdaterProps): TSummaryItem | null {
  const { packages } = productDataAdapter(products);
  const arr = summaryItems.map((item) => {
    return item.productKey;
  });
  const foundPackageItem = packages
    .filter((packageItem) => {
      return isArrayPartOfArray<string>(
        [...new Set([...arr, itemToAdd.productKey])],
        packageItem.includedProducts,
      );
    })
    .map((item) => ({ ...item, price: item.price[itemToAdd.selectedYear] }))
    .sort((a, b) => {
      return a.price - b.price;
    })[0];
  if (!foundPackageItem) {
    return null;
  }
  return {
    ...foundPackageItem,
    selectedYear: itemToAdd.selectedYear,
  };
}

import { TProduct, TSummaryItem, isSummaryItem } from "../../types";
import productDataAdapter from "./productDataAdapter";

type UpdaterProps = {
  itemToAdd: TSummaryItem;
  products: TProduct[];
  summaryItems: TSummaryItem[];
};

function isArrayPartOfArray<T>(arr: T[], subArr: T[]): boolean {
  return subArr.every((val) => arr.includes(val));
}

function hasEqualYears({
  itemToAdd,
  summaryItems,
}: Pick<UpdaterProps, "itemToAdd" | "summaryItems">): boolean {
  return summaryItems
    .map((item) => item.selectedYear)
    .every((selectedYear) => selectedYear === itemToAdd.selectedYear);
}

function getPackage({
  itemToAdd,
  products,
  summaryItems,
}: UpdaterProps): TSummaryItem | null {
  const { packages } = productDataAdapter(products);
  const arr = summaryItems.map((item) => {
    return item.productKey;
  });
  const foundPackageItem = packages.find((packageItem) => {
    return isArrayPartOfArray<string>(
      [...new Set([...arr, itemToAdd.productKey])],
      packageItem.includedProducts
    );
  });
  if (!foundPackageItem) {
    return null;
  }
  return {
    ...foundPackageItem,
    selectedYear: itemToAdd.selectedYear,
    price: foundPackageItem.price[itemToAdd.selectedYear],
  };
}

function isInSummaryItems({
  itemToAdd,
  summaryItems,
}: Pick<UpdaterProps, "itemToAdd" | "summaryItems">): boolean {
  return summaryItems.some((item) => {
    return item.id === itemToAdd.id;
  });
}

function isPackage(itemToAdd: TSummaryItem): boolean {
  return !!itemToAdd?.includedProducts?.length;
}

function isPartOfThePackage({
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
      packageItem.includedProducts
    );
  });
}
type Validators = {
  shouldSetPackageIfItemIsPartOfPackage: boolean;
  shouldReplaceItemsInSummaryWithPackage: boolean;
  shouldSetOnlyPackageIfItemIsPackage: boolean;
};
function validators({
  itemToAdd,
  products,
  summaryItems,
}: UpdaterProps): Validators {
  return {
    shouldSetPackageIfItemIsPartOfPackage:
      isPartOfThePackage({ itemToAdd, products, summaryItems }) &&
      hasEqualYears({ itemToAdd, summaryItems }),
    shouldReplaceItemsInSummaryWithPackage: isInSummaryItems({
      itemToAdd,
      summaryItems,
    }),
    shouldSetOnlyPackageIfItemIsPackage: isPackage(itemToAdd),
  };
}

function summaryItemsUpdater({
  itemToAdd,
  products,
  summaryItems,
}: UpdaterProps): TSummaryItem[] {
  const {
    shouldSetPackageIfItemIsPartOfPackage,
    shouldReplaceItemsInSummaryWithPackage,
    shouldSetOnlyPackageIfItemIsPackage,
  } = validators({ itemToAdd, products, summaryItems });

  if (shouldSetPackageIfItemIsPartOfPackage) {
    const gotPackage = getPackage({ itemToAdd, products, summaryItems });
    if (!isSummaryItem(gotPackage)) {
      return [];
    }
    return [gotPackage];
  }
  if (shouldReplaceItemsInSummaryWithPackage) {
    const gotPackage = getPackage({ itemToAdd, products, summaryItems });
    return gotPackage
      ? [gotPackage]
      : [...summaryItems.filter((item) => item.id !== itemToAdd.id), itemToAdd];
  }
  if (shouldSetOnlyPackageIfItemIsPackage) {
    return [itemToAdd];
  }
  return [...summaryItems.filter((item) => !item?.includedProducts), itemToAdd];
}

export default summaryItemsUpdater;

import { TProduct, TSummaryItem, isSummaryItem } from "../../types";
import productDataAdapter from "./productDataAdapter";

type UpdaterProps = {
  itemToAdd: TSummaryItem;
  products: TProduct[];
  summaryItems: TSummaryItem[];
};

type Commands = {
  addPackageFromRelatedItems: boolean;
  addPackageItem: boolean;
  addNonPackageItem: boolean;
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
  const foundPackageItem = packages
    .filter((packageItem) => {
      return isArrayPartOfArray<string>(
        [...new Set([...arr, itemToAdd.productKey])],
        packageItem.includedProducts
      );
    })
    .map((item) => ({ ...item, price: item.price[itemToAdd.selectedYear] }))
    .sort((a, b) => {
      console.log({ a, b });
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

function isPackage(itemToAdd: TSummaryItem): boolean {
  return !!itemToAdd?.includedProducts?.length;
}

function arePackagesRelated(
  itemToAdd: TSummaryItem,
  itemFromList: TSummaryItem
) {
  return (
    itemFromList.includedProducts &&
    itemFromList.includedProducts.some(
      (productKey) =>
        itemToAdd.includedProducts &&
        itemToAdd.includedProducts.includes(productKey)
    )
  );
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
function getCommands({
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

function isInSummaryItemPackage(
  itemToAdd: TSummaryItem,
  summaryItems: TSummaryItem[]
) {
  const packages = summaryItems.filter((item) => !!item?.includedProducts);
  return (
    !!packages?.length &&
    packages
      .filter((item) => item.selectedYear === itemToAdd.selectedYear)
      .map((item) => item.includedProducts)
      .some(
        (includedProducts) =>
          includedProducts && includedProducts.includes(itemToAdd.productKey)
      )
  );
}

function summaryItemsUpdater({
  itemToAdd,
  products,
  summaryItems,
}: UpdaterProps): TSummaryItem[] {
  const { addPackageFromRelatedItems, addPackageItem, addNonPackageItem } =
    getCommands({ itemToAdd, products, summaryItems });

  if (addPackageFromRelatedItems) {
    const gotPackage = getPackage({ itemToAdd, products, summaryItems });
    if (!isSummaryItem(gotPackage)) {
      return [];
    }
    return [
      ...summaryItems.filter(
        (item) =>
          gotPackage.id !== item.id &&
          gotPackage.selectedYear !== item.selectedYear &&
          gotPackage?.includedProducts &&
          !gotPackage?.includedProducts.includes(item.productKey)
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
        (item) => itemToAdd.id !== item.id && itemToAdd.selectedYear
      ),
      itemToAdd,
    ];
  }
  // default
  return summaryItems;
}

export default summaryItemsUpdater;

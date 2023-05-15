import { sumPricesOfPackageItems } from "../../services/Product/calculatePrice";
import { TProduct, TSummaryItem } from "../../types";

export function getPackages(summaryItems: TSummaryItem[]) {
  return summaryItems.filter((item) => item?.includedProducts);
}
export function handleCalculatePriceOfPackageItem(
  packages: TSummaryItem[],
  products: TProduct[]
) {
  return packages.length
    ? packages
        .map((item) => {
          return sumPricesOfPackageItems(
            item.includedProducts as string[],
            item.selectedYear as string,
            products
          );
        })
        .reduce((a, b) => a + b)
    : 0;
}

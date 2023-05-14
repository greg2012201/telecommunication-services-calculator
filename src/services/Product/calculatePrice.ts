import { TProduct, TSummaryItem } from "../../types";

export function sumPricesOfPackageItems(
  productKeys: string,
  selectedYear: string,
  products: TProduct[]
): number {
  return products
    .filter((product) => {
      return productKeys.includes(product.productKey);
    })
    .map((product) => product.price[selectedYear])
    .reduce((a, b) => a + b);
}

export function calculateTotalPrice(summaryItems: TSummaryItem[]) {
  if (!summaryItems?.length) {
    return 0;
  }
  return summaryItems.map((item) => item.price).reduce((a, b) => a + b);
}

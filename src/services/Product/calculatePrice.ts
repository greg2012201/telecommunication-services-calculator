import type { TProduct, TSummaryItem } from '../../types';

export function sumPricesOfPackageItems(
  includedProducts: string[],
  selectedYear: string,
  products: TProduct[],
): number {
  return products
    .filter((product) => {
      return includedProducts.includes(product.productKey);
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

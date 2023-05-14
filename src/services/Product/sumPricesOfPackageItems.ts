import type { TProduct } from "../../types";

function sumPricesOfPackageItems(
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

export default sumPricesOfPackageItems;

import { findProductById } from ".";
import type { TProduct, TSummaryItem } from "../../types";

function getProductsByIds(
  summedProductsIds: string[],
  products: TProduct[]
): TProduct[] {
  const transformedProducts: TProduct[] = [];

  summedProductsIds.forEach((productId) => {
    const foundProduct = findProductById(productId, products);
    if (!foundProduct) {
      return;
    }
    transformedProducts.push(foundProduct);
  });
  return transformedProducts;
}

export default getProductsByIds;

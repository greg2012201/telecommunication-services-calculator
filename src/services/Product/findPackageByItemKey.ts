import type { IPackage, TProduct } from "../../types";
import { isPackage } from "../../types/utils";

function findPackageByItemKey(
  products: TProduct[],
  productKey: string
): IPackage | null {
  const foundPackage = products.find((product) => {
    return (
      isPackage(product) &&
      product.includedProducts.some((key) => productKey === key)
    );
  });
  if (!foundPackage) {
    return null;
  }
  return isPackage(foundPackage) ? foundPackage : null;
}

export default findPackageByItemKey;

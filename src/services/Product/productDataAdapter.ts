import type { IItem, IPackage, TProduct } from "../../types";
import { isPackage } from "../../types/utils";

function productDataAdapter(products: TProduct[]): {
  items: IItem[];
  packages: IPackage[];
} {
  const items: IItem[] = [];
  const packages: IPackage[] = [];
  products.forEach((product) => {
    if (isPackage(product)) {
      packages.push(product);
    } else {
      items.push(product);
    }
  });
  return { items, packages };
}

export default productDataAdapter;

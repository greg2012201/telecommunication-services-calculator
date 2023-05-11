import { IItem, IPackage, TProduct, isPackage } from "../../types";

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

type ProductKey = string;

export function isPackage(x: any): x is Package {
  return x.type === "PACKAGE";
}
export interface Product {
  name: string;
  description: string;
  productKey: ProductKey;
  type: "ITEM" | "PACKAGE";
  price: {
    2023: number;
    2024: number;
    2025: number;
  };
}

export interface Package extends Product {
  includedProducts: ProductKey[];
}

type ProductKey = string;

export interface Product {
  name: string;
  productKey: ProductKey;
  price: {
    2023: number;
    2024: number;
    2025: number;
  };
  includedProduct: ProductKey[];
}

type TProductKey = string;

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export function isPackage(x: IItem | IPackage): x is IPackage {
  return x.kind === "PACKAGE";
}

export function isUnaryFn<T>(x: unknown): x is (arg: T) => void {
  return typeof x === "function";
}
export interface IItem {
  readonly id: string;
  name: string;
  description: string;
  productKey: TProductKey;
  kind: "ITEM" | "PACKAGE";
  price: {
    2023: number;
    2024: number;
    2025: number;
  };
  currency: string;
}

export interface IPackage extends IItem {
  includedProducts: TProductKey[];
}

export type TProduct = IItem | IPackage;

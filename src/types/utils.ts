import type { IItem, IPackage, TProduct, TSummaryItem } from '.';

export function isString(x: unknown): x is string {
  return typeof x === 'string';
}

export function isPackage(x: IItem | IPackage | TProduct): x is IPackage {
  return x.kind === 'PACKAGE';
}

export function isSummaryItem(x: any): x is TSummaryItem {
  return x?.selectedYear && x?.includedProducts;
}

export function isUnaryFn<T>(x: unknown): x is (arg: T) => void {
  return typeof x === 'function';
}

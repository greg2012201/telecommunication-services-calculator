type TProductKey = string;

export interface IItem {
  readonly id: string;
  name: string;
  description: string;
  productKey: TProductKey;
  kind: 'ITEM' | 'PACKAGE';
  price: Record<'2023' | '2024' | '2025', number>;
}

export interface IPackage extends IItem {
  includedProducts: TProductKey[];
}

export type TProduct = IItem | IPackage;

export type TSummaryItem = Pick<IItem, 'id' | 'name' | 'productKey'> & {
  price: number;
  selectedYear: number | string;
  includedProducts?: TProductKey[];
};

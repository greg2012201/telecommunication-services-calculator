import { TProduct, TSummaryItem } from "../types";

export const products: TProduct[] = [
  {
    id: "6f7a6f63-fd4c-4aa7-8d9b-95c59a3aaec8",
    name: "Internet",
    description: "Fast internet",
    productKey: "internet",
    kind: "ITEM",
    price: {
      2025: 59,
      2024: 49,
      2023: 39,
    },
  },
  {
    id: "5b41fbf2-9894-48f4-8b52-cc1818c3fb67",
    name: "Television",
    description: "Cable television",
    productKey: "tv",
    kind: "ITEM",
    price: {
      2025: 59,
      2024: 49,
      2023: 49,
    },
  },
  {
    id: "c2311c3e-0109-4743-b2ee-506166ce40f1",
    name: 'Package "Internet + Television"',
    description: "Internet + television in one package",
    productKey: "internet_tv_package",
    kind: "PACKAGE",
    price: {
      2025: 99,
      2024: 89,
      2023: 79,
    },
    includedProducts: ["internet", "tv", "decoder"],
  },
  {
    id: "1b11b26b-41b7-4a85-986c-38f77fb5314e",
    name: 'Package "Internet + Phone Subscription"',
    description: "Internet + phone subscription in one package",
    productKey: "internet_phone_package",
    kind: "PACKAGE",
    price: {
      2025: 64,
      2024: 64,
      2023: 64,
    },
    includedProducts: ["internet", "phone"],
  },
  {
    id: "b5f02d1c-507e-43a7-9df4-c2e77994372c",
    name: "Phone Subscription",
    description: "Phone subscription",
    productKey: "phone",
    kind: "ITEM",
    price: {
      2025: 29,
      2024: 29,
      2023: 29,
    },
  },
  {
    id: "beed5626-23fa-4c04-9cc3-e327b1d8c162",
    name: "4K Decoder",
    description: "Decoder with 4K support",
    productKey: "decoder",
    kind: "ITEM",
    price: {
      2025: 29,
      2024: 29,
      2023: 29,
    },
  },
];

type SummaryItemGetterProps = {
  id: string;
  selectedYear: string;
  price: number;
};

export function hydrateMockProps({
  id,
  selectedYear,
  price,
}: SummaryItemGetterProps): TSummaryItem {
  const foundProduct = products.find((products) => products.id === id);

  return { ...foundProduct, selectedYear, price } as TSummaryItem;
}

export function hydrateManyMockProps(items: SummaryItemGetterProps[]) {
  const mocks: TSummaryItem[] = [];
  items.forEach((itemProps) => {
    const foundItem = hydrateMockProps(itemProps);
    mocks.push(foundItem);
  });
  return mocks;
}

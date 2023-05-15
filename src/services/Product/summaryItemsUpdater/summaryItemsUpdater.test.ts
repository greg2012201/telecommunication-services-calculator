import { it, expect, describe } from "vitest";
import summaryItemsUpdater from ".";
import {
  hydrateManyMockProps,
  hydrateMockProps,
  products,
} from "../../../mocks/test";

describe("summaryItemsUpdater", () => (
  it("should add item correctly to the summary", () => {
    const mockItem = hydrateMockProps({
      id: "6f7a6f63-fd4c-4aa7-8d9b-95c59a3aaec8",
      selectedYear: "2025",
      price: 59,
    });

    const result = summaryItemsUpdater({
      itemToAdd: mockItem,
      products,
      summaryItems: [],
    });
    const addedItem = result.find((item) => item.id == mockItem.id);
    expect(addedItem?.id ?? "").toBe(mockItem.id);
  }),
  it("should add package correctly if summary items match its sub-elements(includedProducts)", () => {
    const phoneItemMock = hydrateMockProps({
      id: "b5f02d1c-507e-43a7-9df4-c2e77994372c",
      selectedYear: "2025",
      price: 29,
    });
    const internetItemMock = hydrateMockProps({
      id: "6f7a6f63-fd4c-4aa7-8d9b-95c59a3aaec8",
      selectedYear: "2025",
      price: 59,
    });
    const result = summaryItemsUpdater({
      itemToAdd: internetItemMock,
      products,
      summaryItems: [phoneItemMock],
    });
    expect(result[0].includedProducts).toEqual(["internet", "phone"]);
  }),
  it("should not be able to add item that is part of package if this package is already in summary", () => {
    const itemToAdd = hydrateMockProps({
      id: "b5f02d1c-507e-43a7-9df4-c2e77994372c",
      selectedYear: "2025",
      price: 29,
    });
    const packageItem = hydrateMockProps({
      id: "1b11b26b-41b7-4a85-986c-38f77fb5314e",
      selectedYear: "2025",
      price: 64,
    });
    const result = summaryItemsUpdater({
      itemToAdd: itemToAdd,
      products,
      summaryItems: [packageItem],
    });
    expect(result).toEqual([packageItem]);
  }),
  it("should replace matching sub-elements with just added packages", () => {
    const initialSummaryItems = hydrateManyMockProps([
      {
        id: "b5f02d1c-507e-43a7-9df4-c2e77994372c",
        selectedYear: "2025",
        price: 29,
      },
      {
        id: "6f7a6f63-fd4c-4aa7-8d9b-95c59a3aaec8",
        selectedYear: "2025",
        price: 59,
      },
    ]);

    const packageItem = hydrateMockProps({
      id: "1b11b26b-41b7-4a85-986c-38f77fb5314e",
      selectedYear: "2025",
      price: 64,
    });
    const result = summaryItemsUpdater({
      itemToAdd: packageItem,
      products,
      summaryItems: initialSummaryItems,
    });
    expect(result).toEqual([packageItem]);
  }),
  it("should add item that is sub-element of package in summary if selected year doesn't match", () => {
    const itemToAdd = hydrateMockProps({
      id: "b5f02d1c-507e-43a7-9df4-c2e77994372c",
      selectedYear: "2025",
      price: 29,
    });
    const packageItem = hydrateMockProps({
      id: "1b11b26b-41b7-4a85-986c-38f77fb5314e",
      selectedYear: "2024",
      price: 64,
    });
    const result = summaryItemsUpdater({
      itemToAdd: itemToAdd,
      products,
      summaryItems: [packageItem],
    });
    expect(result).toEqual([packageItem, itemToAdd]);
  }),
  it("should edit item", () => {
    const itemToEdit = hydrateMockProps({
      id: "5b41fbf2-9894-48f4-8b52-cc1818c3fb67",
      selectedYear: "2025",
      price: 59,
    });
    const itemInSummary = hydrateMockProps({
      id: "5b41fbf2-9894-48f4-8b52-cc1818c3fb67",
      selectedYear: "2024",
      price: 49,
    });
    const result = summaryItemsUpdater({
      itemToAdd: itemToEdit,
      products,
      summaryItems: [itemInSummary],
    });
    expect(result).toEqual([itemToEdit]);
  })
));

import { useState } from "react";
import {
  useProduct,
  productDataAdapter,
  priceAdapter,
} from "../../services/Product";
import type { TProduct, TSummaryItem } from "../../types";
import SelectField from "../SelectField";
import styles from "./ProductList.module.css";
import { isString } from "../../types/utils";

type ItemToAddProps = {
  id: string;
  name: string;
  price: number;
  selectedYear: string;
  productKey: string;
  includedProducts?: string[];
};

type ListItemProps = Pick<
  TProduct,
  "id" | "name" | "price" | "description" | "productKey"
> & {
  handleAddItem({
    id,
    price,
    selectedYear,
    productKey,
    includedProducts,
    name,
  }: ItemToAddProps): void;
} & {
  includedProducts?: string[];
  isActive: boolean;
  summaryItems?: TSummaryItem[];
};

function isActive(currId: TProduct["id"], summaryItems: TSummaryItem[]) {
  return summaryItems.some((item) => {
    return item.id === currId;
  });
}

const isDisabled = (
  summaryItems: TSummaryItem[],
  currItemProps: Pick<TSummaryItem, "productKey" | "selectedYear">
) => {
  return summaryItems.some((item) => {
    if (!item?.includedProducts) {
      return;
    }
    return (
      item.includedProducts.includes(currItemProps.productKey) &&
      item.selectedYear === currItemProps.selectedYear
    );
  });
};

function ListItem({
  id,
  name,
  price,
  description,
  handleAddItem,
  productKey,
  includedProducts,
  summaryItems,
  isActive,
}: ListItemProps) {
  const options = priceAdapter(price);
  const initialOption = options[0];
  const [selectedOption, setSelectedOption] = useState(initialOption);
  return (
    <li className={styles.list_item}>
      <div className={styles.list_item_description_wrapper}>
        <p>{name}</p>
        <p className={styles.list_item_description}>{description}</p>
      </div>
      <div className={styles.list_item_price_wrapper}>
        <p className={styles.list_item_price_indicator}>
          <span>Price:</span>
          {selectedOption.value}
          PLN
        </p>
        <SelectField
          id={id}
          name={name}
          label="Choose an option"
          options={options}
          handleChange={(selectedOption) => {
            setSelectedOption(selectedOption);
          }}
          defaultOptionLabel={initialOption.label}
        />
        <button
          onClick={() => {
            const selectedPriceAsNumber = isString(selectedOption.value)
              ? parseInt(selectedOption.value, 10)
              : selectedOption.value;

            handleAddItem({
              id,
              price: selectedPriceAsNumber,
              selectedYear: selectedOption.label,
              productKey,
              includedProducts,
              name,
            });
          }}
          className={styles.list_item_button}
          type="button"
          disabled={
            !!summaryItems &&
            isDisabled(summaryItems, {
              selectedYear: selectedOption.label,
              productKey,
            })
          }
        >
          {isActive ? "Edit" : "Add"}
        </button>
      </div>
    </li>
  );
}

function ProductList() {
  const { state, dispatch } = useProduct();
  const { products, summaryItems } = state;
  const { items, packages } = productDataAdapter(products);
  const handleAddItem = (itemProps: ItemToAddProps) => {
    dispatch({
      type: "UPDATE_SUMMARY",
      payload: itemProps,
    });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.divider_description}>Items</p>

      <ul className={styles.list}>
        {items.map((item) => {
          const { id, ...rest } = item;
          return (
            <ListItem
              key={id}
              id={id}
              handleAddItem={handleAddItem}
              isActive={isActive(id, summaryItems)}
              summaryItems={summaryItems}
              {...rest}
            />
          );
        })}
      </ul>
      <p className={styles.divider_description}>Packages</p>
      <ul className={styles.list}>
        {packages.map(({ id, ...rest }) => {
          return (
            <ListItem
              key={id}
              id={id}
              isActive={isActive(id, summaryItems)}
              handleAddItem={handleAddItem}
              {...rest}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ProductList;

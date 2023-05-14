import { useState } from "react";
import {
  useProduct,
  productDataAdapter,
  priceAdapter,
} from "../../services/Product";
import { TProduct, isString } from "../../types";
import SelectField from "../SelectField";
import styles from "./ProductList.module.css";

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
  "id" | "name" | "price" | "description" | "currency" | "productKey"
> & {
  handleAddItem({
    id,
    price,
    selectedYear,
    productKey,
    includedProducts,
    name,
  }: ItemToAddProps): void;
} & { includedProducts?: string[] };

function ListItem({
  id,
  name,
  price,
  description,
  currency,
  handleAddItem,
  productKey,
  includedProducts,
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
          {currency}
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
        >
          Add
        </button>
      </div>
    </li>
  );
}

function ProductList() {
  const { state, dispatch } = useProduct();
  const { products } = state;
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
        {items.map(({ id, ...rest }) => {
          return (
            <ListItem
              key={id}
              id={id}
              handleAddItem={handleAddItem}
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

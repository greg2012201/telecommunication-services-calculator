import { useState } from "react";
import {
  useProduct,
  productDataAdapter,
  priceAdapter,
} from "../../services/Product";
import { TProduct, isString } from "../../types";
import SelectField from "../SelectField";
import styles from "./ProductList.module.css";

type ListItemProps = Pick<
  TProduct,
  "id" | "name" | "price" | "description" | "currency"
> & { handleAddItem({ id, price }: { id: string; price: number }): void };

function ListItem({
  id,
  name,
  price,
  description,
  currency,
  handleAddItem,
}: ListItemProps) {
  const options = priceAdapter(price);
  const initialOption = options[0];
  const [selectedPrice, setSelectedPrice] = useState(initialOption.value);

  return (
    <li className={styles.list_item}>
      <div className={styles.list_item_description_wrapper}>
        <p>{name}</p>
        <p className={styles.list_item_description}>{description}</p>
      </div>
      <div className={styles.list_item_price_wrapper}>
        <p className={styles.list_item_price_indicator}>
          <span>Price:</span>
          {selectedPrice}
          {currency}
        </p>
        <SelectField
          id={id}
          name={name}
          label="Choose an option"
          options={options}
          handleChange={(value) => {
            setSelectedPrice(value);
          }}
          selectedOptionLabel={initialOption.label}
        />
        <button
          onClick={() => {
            if (!isString(selectedPrice)) {
              return;
            }
            handleAddItem({ id, price: parseInt(selectedPrice, 10) });
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
  console.log({ state });
  const { items, packages } = productDataAdapter(products);
  const handleAddItem = ({ id, price }: { id: string; price: number }) => {
    dispatch({ type: "ADD_PRODUCT_TO_SUMMARY", payload: { id, price } });
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

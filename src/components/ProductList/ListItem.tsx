import { useState } from "react";
import { priceAdapter } from "../../services/Product";
import type { TSummaryItem } from "../../types";
import styles from "./ListItem.module.css";
import { isString } from "../../types/utils";
import SelectField from "../SelectField";
import type { ListItemProps } from "./types";

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
    <li className={styles.wrapper}>
      <div className={styles.description_wrapper}>
        <p>{name}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.price_wrapper}>
        <p className={styles.price_indicator}>
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
          className={styles.button}
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

export default ListItem;

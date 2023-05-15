import { useProduct, productDataAdapter } from "../../services/Product";
import type { TProduct, TSummaryItem } from "../../types";
import ListItem from "./ListItem";
import styles from "./ProductList.module.css";
import type { ItemToAddProps } from "./types";

function isActive(currId: TProduct["id"], summaryItems: TSummaryItem[]) {
  return summaryItems.some((item) => {
    return item.id === currId;
  });
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

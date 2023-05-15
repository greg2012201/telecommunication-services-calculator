import { useProduct } from "../../services/Product";
import { calculateTotalPrice } from "../../services/Product/calculatePrice";
import styles from "./SummaryList.module.css";
import { getPackages, handleCalculatePriceOfPackageItem } from "./utils";

function SummaryList() {
  const { state, dispatch } = useProduct();
  const { summaryItems, products } = state;

  const priceWithoutPackage = handleCalculatePriceOfPackageItem(
    getPackages(summaryItems),
    products
  );
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list_wrapper}>
        {summaryItems.map(({ id, name, price, selectedYear }) => {
          return (
            <li className={styles.list_item_wrapper} key={`${id}-${name}`}>
              <span>✔</span>
              <div className={styles["list_item_prop_wrapper--title"]}>
                <p>{name}</p>
              </div>
              <div className={styles.list_item_prop_wrapper}>
                <p className={styles.list_item_prop_label}>Price:</p>
                <p>{price}PLN</p>
              </div>
              <div className={styles.list_item_prop_wrapper}>
                <p className={styles.list_item_prop_label}>Year:</p>
                <p>{selectedYear}</p>
              </div>
              <button
                onClick={() => dispatch({ type: "REMOVE_ITEM", payload: id })}
                className={styles.list_item_delete_button}
                type="button"
              >
                ✖
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.price_summary_wrapper}>
        {priceWithoutPackage ? (
          <p>Without the package:{priceWithoutPackage}PLN </p>
        ) : null}
        <p>Total Price:{calculateTotalPrice(summaryItems)}PLN</p>
      </div>
    </div>
  );
}

export default SummaryList;

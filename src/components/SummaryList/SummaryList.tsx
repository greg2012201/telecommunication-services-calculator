import { useProduct } from '../../services/Product';
import { calculateTotalPrice } from '../../services/Product/calculatePrice';
import Button from '../Button';
import PropWrapper from './PropWrapper';
import styles from './SummaryList.module.css';
import { getPackages, handleCalculatePriceOfPackageItem } from './utils';

function SummaryList() {
  const { state, dispatch } = useProduct();
  const { summaryItems, products } = state;

  const priceWithoutPackage = handleCalculatePriceOfPackageItem(
    getPackages(summaryItems),
    products,
  );
  const summaryIsEmpty = !summaryItems.length;
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list_wrapper}>
        {summaryItems.map(({ id, name, price, selectedYear }) => {
          return (
            <li className={styles.list_item_wrapper} key={`${id}-${name}`}>
              <span>✔</span>
              <PropWrapper value={name} hasTitle />
              <PropWrapper value={`${price}PLN`} label='Price:' />
              <PropWrapper value={selectedYear.toString()} label='Year:' />
              <button
                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: id })}
                className={styles.list_item_delete_button}
                type='button'
              >
                ✖
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.list_footer}>
        <div className={styles.price_summary_wrapper}>
          {priceWithoutPackage ? (
            <p className={styles['price_summary_wrapper--without-discount']}>
              Without the package:{priceWithoutPackage}PLN
            </p>
          ) : null}
          <p>Total Price:{calculateTotalPrice(summaryItems)}PLN</p>
        </div>
        <Button
          handleClick={() => dispatch({ type: 'RESET_SUMMARY' })}
          disabled={summaryIsEmpty}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default SummaryList;

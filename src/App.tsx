import ProductList from "./components/ProductList";
import { ProductContainer } from "./services/Product";
import styles from "./App.module.css";
import SummaryList from "./components/SummaryList";

function App() {
  return (
    <div className={styles.layout}>
      <div className={styles.title_wrapper}>
        <h1 className={styles.title}>Telco Services calculator</h1>
        <p>Find your best offer</p>
      </div>
      <ProductContainer>
        <div className={styles.product_wrapper}>
          <ProductList />
          <SummaryList />
        </div>
      </ProductContainer>
    </div>
  );
}

export default App;

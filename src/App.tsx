import ProductList from './components/ProductList';
import { ProductContainer } from './services/Product';
import styles from './App.module.css';
import SummaryList from './components/SummaryList';
import Header from './components/Header';

function App() {
  return (
    <div className={styles.layout}>
      <Header title='Telco Services calculator' subtitle='Find your best offer' />
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

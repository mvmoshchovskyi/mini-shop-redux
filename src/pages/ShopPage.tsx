import { ProductList } from '../components/product-list/ProductList';
import styles from './ShopPage.module.scss';

export const ShopPage = () => {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Products page</h1>

      <ProductList />
    </section>
  );
};

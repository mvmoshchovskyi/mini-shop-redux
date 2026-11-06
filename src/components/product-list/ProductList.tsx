import { products } from '../../data/products';
import { ProductCard } from '../product-card/ProductCard';
import styles from './ProductList.module.scss';

export const ProductList = () => {
  return (
    <section className={styles.list}>
      <h2 className={styles.heading}>Product list</h2>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

import { products } from '../../data/products';
import { ProductCard } from '../product-card/ProductCard';

export const ProductList = () => {
  return (
    <section>
      <h2>Products</h2>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

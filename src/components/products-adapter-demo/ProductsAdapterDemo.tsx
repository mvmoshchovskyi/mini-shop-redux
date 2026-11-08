import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchProducts,
} from '../../features/products/productsSlice';

import {
  productsSelectors,
} from '../../features/products/productSelector'

import { ProductCard } from '../product-card/ProductCard';

export const ProductsAdapterDemo = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(productsSelectors.selectAll);
  const isLoading = useAppSelector(
    (state) => state.products.productsLoading,
  );
  const error = useAppSelector(
    (state) => state.products.error,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Products — Entity Adapter</h2>

      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

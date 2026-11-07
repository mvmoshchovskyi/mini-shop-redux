import { useEffect } from "react";
import { products as initialProducts } from "../../data/products";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCard } from "../product-card/ProductCard";
import {
  clearProducts,
  fetchProducts,
  setProducts,
} from "../../features/products/productsSlice";
import styles from "./ProductList.module.scss";

export const ProductList = () => {
  const {
    items: productList,
    productsLoading,
    error,
  } = useAppSelector((state) => state.products);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <section className={styles.list}>
      <h2 className={styles.heading}>Product list</h2>
      {productsLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <section className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.clearButton}`}
          onClick={() => dispatch(clearProducts())}
        >
          Clear Products
        </button>

        <button
          className={`${styles.button} ${styles.restoreButton}`}
          onClick={() => dispatch(setProducts(initialProducts))}
        >
          Restore products
        </button>
      </section>

      <div className={styles.grid}>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

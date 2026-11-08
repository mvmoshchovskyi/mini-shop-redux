// import { useEffect } from "react";
import {
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../features/products/productsApi";
import { products as initialProducts } from "../../data/products";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCard } from "../product-card/ProductCard";
import {
  clearProducts,
  // fetchProducts,
  setProducts,
} from "../../features/products/productsSlice";
import styles from "./ProductList.module.scss";

export const ProductList = () => {
  // const {
  //   items: productList,
  //   productsLoading,
  //   error,
  // } = useAppSelector((state) => state.products);

  const {
    data: productList,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useGetProductsQuery();

  const [addProduct, { isLoading: isAddingProduct, error: addProductError }] =
    useAddProductMutation();

  const handleAddProduct = async () => {
    try {
      const newProduct = await addProduct({
        title: "New laptop",
        price: 1500,
        image: "laptop.jpg",
      }).unwrap();

      console.log("Created:", newProduct);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  return (
    <section className={styles.list}>
      <h2 className={styles.heading}>Product list</h2>
      {isLoading && <p>Loading...</p>}
      {productList && isFetching && <p>Updating products...</p>}
      {error && <p>Something went wrong</p>}

      <section className={styles.buttons}>
        <button
          onClick={handleAddProduct}
          className={`${styles.button} ${styles.restoreButton}`}
        >
          Add product
        </button>
        <button
          disabled={isFetching}
          className={`${styles.button} ${styles.clearButton}`}
          onClick={() => refetch()}
        >
          Refresh
        </button>
        {/* <button
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
        </button> */}
      </section>

      <div className={styles.grid}>
        {productList?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

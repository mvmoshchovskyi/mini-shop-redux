// import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  useAddProductMutation,
  useGetProductsQuery,
  // useUpdateProductMutation,
} from "../../features/products/productsApi";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductCard } from "../product-card/ProductCard";
// import {
//   clearProducts,
//   fetchProducts,
//   setProducts,
// } from "../../features/products/productsSlice";
import styles from "./ProductList.module.scss";

export const ProductList = () => {
  const { t } = useTranslation();

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

  const [addProduct, { isLoading: isAddingProduct }] =
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
      <h2 className={styles.heading}>{t("productList.heading")}</h2>
      {isLoading && <p>{t("productList.loading")}</p>}
      {productList && isFetching && <p>{t("productList.updating")}</p>}
      {error && <p>{t("productList.error")}</p>}

      <section className={styles.buttons}>
        <button
          onClick={handleAddProduct}
          disabled={isAddingProduct}
          className={`${styles.button} ${styles.restoreButton}`}
        >
          {isAddingProduct
            ? t("productList.adding")
            : t("productList.addProduct")}
        </button>
        <button
          disabled={isFetching}
          className={`${styles.button} ${styles.clearButton}`}
          onClick={() => refetch()}
        >
          {t("productList.refresh")}
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

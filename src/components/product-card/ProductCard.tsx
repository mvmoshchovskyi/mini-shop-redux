import type { Product } from "../../types/product";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import styles from "./ProductCard.module.scss";
import { useUpdateProductMutation } from "../../features/products/productsApi";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const [updateProduct, { isLoading: isUpdatingProduct }] =
    useUpdateProductMutation();

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = await updateProduct({
        id: product.id,
        updatedProduct: { price: 200 },
      }).unwrap();

      console.log("Update:", updatedProduct);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.footer}>
        <p className={styles.price}>${product.price}</p>
        <button className={styles.button} onClick={handleAddToCart}>
          Add to cart
        </button>
        <button
          disabled={isUpdatingProduct}
          onClick={handleUpdateProduct}
          className={`${styles.button} ${styles.clearButton}`}
        >
          {isUpdatingProduct ? "Updating..." : "Update product"}
        </button>
      </div>
    </article>
  );
};

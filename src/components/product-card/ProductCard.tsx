import type { Product } from '../../types/product';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>${product.price}</p>

      <button className={styles.button} type="button" onClick={handleAddToCart}>
        Add to cart
      </button>
    </article>
  );
};

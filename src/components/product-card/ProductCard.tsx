import type { Product } from '../../types/product';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article>
      <h3>{product.title}</h3>
      <p>${product.price}</p>

      <button onClick={handleAddToCart}>
        Add to cart
      </button>
    </article>
  );
};

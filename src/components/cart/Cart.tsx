import { useAppSelector } from '../../app/hooks';

export const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <section>
      <h2>Cart ({cartItems.length})</h2>

      {cartItems.map((item) => (
        <div key={item.id}>
          {item.title} — {item.quantity} шт.
        </div>
      ))}
    </section>
  );
};

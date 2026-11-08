import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCartItems, selectCartTotal } from "../../features/cart/cartSelectors";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";
import styles from "./Cart.module.scss";

export const Cart = () => {
  const { t } = useTranslation();
  // const cartItems = useAppSelector((state) => state.cart.items);
  const total = useAppSelector(selectCartTotal);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();


  return (
    <section className={styles.cart}>
      <h2 className={styles.heading}>
        {t("cart.title", { count: cartItems.length })}
      </h2>

      {cartItems.map((item) => (
        <div className={styles.item} key={item.id}>
          <span className={styles.itemTitle}>{item.title}</span>
          <span className={styles.itemPrice}>
            — ${item.price * item.quantity}
          </span>

          <div className={styles.quantity}>
            <button
              className={styles.quantityButton}
              type="button"
              onClick={() => dispatch(decreaseQuantity(item.id))}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              className={styles.quantityButton}
              type="button"
              onClick={() => dispatch(increaseQuantity(item.id))}
            >
              +
            </button>
          </div>

          <button
            className={styles.removeButton}
            type="button"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            {t("cart.remove")}
          </button>
        </div>
      ))}

      <h3 className={styles.total}>{t("cart.total", { total })}</h3>
    </section>
  );
};

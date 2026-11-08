import { useTranslation } from "react-i18next";

import { ProductList } from "../components/product-list/ProductList";
import styles from "./ShopPage.module.scss";

export const ShopPage = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t("shopPage.title")}</h1>
      <ProductList />
    </section>
  );
};

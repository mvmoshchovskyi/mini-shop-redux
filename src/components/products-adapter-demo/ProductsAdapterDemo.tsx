import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearProducts,
  fetchProducts,
  productAdded,
  productRemoved,
  productUpdated,
} from '../../features/products/productsSlice';
import {
  productsSelectors,
  selectProductsError,
  selectProductsLoading,
} from '../../features/products/productSelector';
import { ProductCard } from '../product-card/ProductCard';
import ui from '../demo-ui/DemoUi.module.scss';
import styles from './ProductsAdapterDemo.module.scss';

const statusClassNames = {
  idle: ui.badgeIdle,
  loading: ui.badgeLoading,
  ready: ui.badgeSuccess,
  error: ui.badgeError,
} as const;

const statusTranslationKeys = {
  idle: 'adapterDemo.status.idle',
  loading: 'adapterDemo.status.loading',
  ready: 'adapterDemo.status.ready',
  error: 'adapterDemo.status.error',
} as const;

export const ProductsAdapterDemo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const products = useAppSelector(productsSelectors.selectAll);
  const ids = useAppSelector(productsSelectors.selectIds);
  const total = useAppSelector(productsSelectors.selectTotal);
  const entities = useAppSelector((state) => state.products.entities);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Якщо вибраного товару більше немає в ids, показуємо перший доступний.
  const activeId =
    selectedId !== null && ids.some((id) => id === selectedId)
      ? selectedId
      : ids[0];

  const selectedProduct = useAppSelector((state) =>
    activeId === undefined
      ? undefined
      : productsSelectors.selectById(state, activeId),
  );

  const status = isLoading
    ? 'loading'
    : error
      ? 'error'
      : total > 0
        ? 'ready'
        : 'idle';

  const handleAddProduct = () => {
    const nextId = ids.length > 0 ? Math.max(...ids.map(Number)) + 1 : 1;

    dispatch(
      productAdded({
        id: nextId,
        title: `Local product #${nextId}`,
        price: 99,
        image: 'local.jpg',
      }),
    );
  };

  const handleUpdateSelected = () => {
    if (!selectedProduct) {
      return;
    }

    dispatch(
      productUpdated({
        id: selectedProduct.id,
        changes: { price: Number((selectedProduct.price + 10).toFixed(2)) },
      }),
    );
  };

  const handleRemoveSelected = () => {
    if (!selectedProduct) {
      return;
    }

    dispatch(productRemoved(selectedProduct.id));
  };

  return (
    <section className={ui.panel}>
      <div className={ui.panelHeader}>
        <div>
          <h2 className={ui.panelTitle}>{t('adapterDemo.title')}</h2>
          <p className={ui.panelDescription}>
            {t('adapterDemo.description')}
          </p>
        </div>

        <span className={`${ui.badge} ${statusClassNames[status]}`}>
          {t(statusTranslationKeys[status])}
        </span>
      </div>

      <dl className={ui.stats}>
        <div className={ui.stat}>
          <dt className={ui.statLabel}>{t('adapterDemo.stats.total')}</dt>
          <dd className={ui.statValue}>{total}</dd>
        </div>
        <div className={ui.stat}>
          <dt className={ui.statLabel}>{t('adapterDemo.stats.idsLength')}</dt>
          <dd className={ui.statValue}>{ids.length}</dd>
        </div>
        <div className={ui.stat}>
          <dt className={ui.statLabel}>{t('adapterDemo.stats.entitiesKeys')}</dt>
          <dd className={ui.statValue}>{Object.keys(entities).length}</dd>
        </div>
        <div className={ui.stat}>
          <dt className={ui.statLabel}>{t('adapterDemo.stats.ids')}</dt>
          <dd className={`${ui.statValue} ${styles.idsValue}`}>
            {ids.length > 0 ? ids.join(', ') : '—'}
          </dd>
        </div>
      </dl>

      {error && <p className={styles.error}>{error}</p>}

      <div className={ui.actions}>
        <button
          type="button"
          className={ui.button}
          onClick={() => dispatch(fetchProducts())}
          disabled={isLoading}
        >
          {isLoading
            ? t('adapterDemo.actions.loading')
            : t('adapterDemo.actions.load')}
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.ghostButton}`}
          onClick={handleAddProduct}
        >
          {t('adapterDemo.actions.add')}
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.ghostButton}`}
          onClick={handleUpdateSelected}
          disabled={!selectedProduct}
        >
          {t('adapterDemo.actions.updatePrice')}
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.dangerButton}`}
          onClick={handleRemoveSelected}
          disabled={!selectedProduct}
        >
          {t('adapterDemo.actions.remove')}
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.dangerButton}`}
          onClick={() => dispatch(clearProducts())}
          disabled={total === 0}
        >
          {t('adapterDemo.actions.clear')}
        </button>
      </div>

      <div className={styles.toolbar}>
        <label className={styles.field}>
          <span>{t('adapterDemo.selectLabel')}</span>
          <select
            className={styles.select}
            value={activeId ?? ''}
            onChange={(event) =>
              setSelectedId(
                event.target.value === '' ? null : Number(event.target.value),
              )
            }
            disabled={ids.length === 0}
          >
            {ids.length === 0 && (
              <option value="">{t('adapterDemo.selectEmpty')}</option>
            )}
            {ids.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.selectedCard}>
          <p className={ui.sectionLabel}>{t('adapterDemo.selectResult')}</p>
          <p className={styles.selectedText}>
            {selectedProduct
              ? `${selectedProduct.title} — $${selectedProduct.price}`
              : 'undefined'}
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        !isLoading && <p className={styles.empty}>{t('adapterDemo.empty')}</p>
      )}

      <div className={styles.debug}>
        <p className={ui.sectionLabel}>{t('adapterDemo.debugLabel')}</p>
        <pre className={ui.code}>
          {JSON.stringify({ ids, entities }, null, 2)}
        </pre>
      </div>

      <p className={ui.note}>
        <strong>{t('adapterDemo.noteTitle')}</strong>{' '}
        {t('adapterDemo.noteText')}
      </p>
    </section>
  );
};

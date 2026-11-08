import { useEffect, useState } from 'react';

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

const statusViews = {
  idle: { label: 'Idle', className: ui.badgeIdle },
  loading: { label: 'Loading', className: ui.badgeLoading },
  ready: { label: 'Ready', className: ui.badgeSuccess },
  error: { label: 'Error', className: ui.badgeError },
} as const;

export const ProductsAdapterDemo = () => {
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

  const statusView = statusViews[status];

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
          <h2 className={ui.panelTitle}>Redux + createEntityAdapter</h2>
          <p className={ui.panelDescription}>
            Дані зберігаються у нормалізованому вигляді: <code>ids</code> — масив
            ідентифікаторів, <code>entities</code> — словник{' '}
            <code>id → product</code>. Селектори adapter читають цю структуру,
            а reducers adapter змінюють її.
          </p>
        </div>

        <span className={`${ui.badge} ${statusView.className}`}>
          {statusView.label}
        </span>
      </div>

      <dl className={ui.stats}>
        <div className={ui.stat}>
          <dt className={ui.statLabel}>selectTotal</dt>
          <dd className={ui.statValue}>{total}</dd>
        </div>
        <div className={ui.stat}>
          <dt className={ui.statLabel}>ids.length</dt>
          <dd className={ui.statValue}>{ids.length}</dd>
        </div>
        <div className={ui.stat}>
          <dt className={ui.statLabel}>entities keys</dt>
          <dd className={ui.statValue}>{Object.keys(entities).length}</dd>
        </div>
        <div className={ui.stat}>
          <dt className={ui.statLabel}>ids</dt>
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
          {isLoading ? 'Loading...' : 'Load products'}
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.ghostButton}`}
          onClick={handleAddProduct}
        >
          Add local product
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.ghostButton}`}
          onClick={handleUpdateSelected}
          disabled={!selectedProduct}
        >
          Update price +10
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.dangerButton}`}
          onClick={handleRemoveSelected}
          disabled={!selectedProduct}
        >
          Remove selected
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.dangerButton}`}
          onClick={() => dispatch(clearProducts())}
          disabled={total === 0}
        >
          clearProducts()
        </button>
      </div>

      <div className={styles.toolbar}>
        <label className={styles.field}>
          <span>Вибір id для selectById</span>
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
            {ids.length === 0 && <option value="">Немає товарів</option>}
            {ids.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.selectedCard}>
          <p className={ui.sectionLabel}>Результат selectById</p>
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
        !isLoading && (
          <p className={styles.empty}>
            Товарів немає. Натисніть “Load products” або “Add local product”.
          </p>
        )
      )}

      <div className={styles.debug}>
        <p className={ui.sectionLabel}>
          Нормалізований state.products (ids + entities)
        </p>
        <pre className={ui.code}>
          {JSON.stringify({ ids, entities }, null, 2)}
        </pre>
      </div>

      <p className={ui.note}>
        <strong>Навіщо це потрібно?</strong> Замість пошуку по масиву{' '}
        <code>find()</code> ви отримуєте товар за O(1) через{' '}
        <code>selectById</code>. А <code>updateOne</code> змінює лише один
        запис, не перебираючи весь список.
      </p>
    </section>
  );
};

import { useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import { useGetProductsQuery } from '../../features/products/productsApi';
import ui from '../demo-ui/DemoUi.module.scss';
import styles from './RtkQueryDemo.module.scss';

const queryStatusClassNames = {
  uninitialized: ui.badgeIdle,
  pending: ui.badgeLoading,
  fulfilled: ui.badgeSuccess,
  rejected: ui.badgeError,
} as const;

const getErrorMessage = (error: unknown) => {
  if (!error) {
    return null;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && 'status' in error) {
    const data = 'data' in error ? JSON.stringify(error.data) : '';

    return `status: ${String(error.status)} ${data}`.trim();
  }

  return 'Unknown error';
};

export const RtkQueryDemo = () => {
  const [enabled, setEnabled] = useState(false);

  const {
    data,
    error,
    status,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    isUninitialized,
    refetch,
  } = useGetProductsQuery(undefined, { skip: !enabled });

  // Показуємо реальний кеш RTK Query, а не лише значення з хука.
  const queries = useAppSelector((state) => state.productsApi.queries);

  const cacheEntries = Object.entries(queries).flatMap(([key, entry]) =>
    entry
      ? [{ key, status: entry.status, hasData: entry.data !== undefined }]
      : [],
  );

  const statusView = isError
    ? { label: 'Error', className: ui.badgeError }
    : isLoading
      ? { label: 'Loading', className: ui.badgeLoading }
      : isFetching
        ? { label: 'Fetching', className: ui.badgeLoading }
        : isSuccess
          ? { label: 'Success', className: ui.badgeSuccess }
          : { label: 'Uninitialized', className: ui.badgeIdle };

  const flags = [
    { name: 'isUninitialized', value: isUninitialized },
    { name: 'isLoading', value: isLoading },
    { name: 'isFetching', value: isFetching },
    { name: 'isSuccess', value: isSuccess },
    { name: 'isError', value: isError },
  ];

  const errorMessage = getErrorMessage(error);

  return (
    <section className={ui.panel}>
      <div className={ui.panelHeader}>
        <div>
          <h2 className={ui.panelTitle}>RTK Query</h2>
          <p className={ui.panelDescription}>
            Запит стартує лише після <code>skip: false</code>. Поки запит не
            запускався, стан — <code>uninitialized</code>. Далі RTK Query
            проходить через <code>pending</code> до <code>fulfilled</code> або{' '}
            <code>rejected</code>.
          </p>
        </div>

        <span className={`${ui.badge} ${statusView.className}`}>
          {statusView.label}
        </span>
      </div>

      <div className={ui.flags}>
        {flags.map((flag) => (
          <span
            key={flag.name}
            className={`${ui.flag} ${flag.value ? ui.flagTrue : ui.flagFalse}`}
          >
            {flag.name}: {String(flag.value)}
          </span>
        ))}
      </div>

      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>status</span>
          <span className={styles.detailValue}>{status}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>data.length</span>
          <span className={styles.detailValue}>{data?.length ?? '—'}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>first product</span>
          <span className={styles.detailValue}>
            {data?.[0]?.title ?? '—'}
          </span>
        </div>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <div className={ui.actions}>
        <button
          type="button"
          className={ui.button}
          onClick={() => setEnabled(true)}
          disabled={enabled && (isLoading || isFetching)}
        >
          Run query
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.ghostButton}`}
          onClick={() => setEnabled(false)}
          disabled={!enabled}
        >
          Skip query
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.ghostButton}`}
          onClick={() => refetch()}
          disabled={!enabled || isLoading || isFetching}
        >
          Refetch
        </button>
      </div>

      <ol className={styles.steps}>
        <li>
          <code>isUninitialized</code> — запит ще не запускався (або компонент
          пропускає його через <code>skip</code>).
        </li>
        <li>
          <code>isLoading</code> — триває перший запит, даних у кеші ще немає.
        </li>
        <li>
          <code>isFetching</code> — будь-який запит у процесі. Під час
          фонового <code>refetch</code> він <code>true</code>, але дані вже
          показані.
        </li>
        <li>
          <code>isSuccess</code> / <code>isError</code> — запит завершився
          успішно або з помилкою.
        </li>
      </ol>

      <div className={styles.cache}>
        <p className={ui.sectionLabel}>
          Кеш RTK Query: state.productsApi.queries
        </p>
        {cacheEntries.length === 0 ? (
          <p className={styles.empty}>
            Кеш порожній. Натисніть “Run query”, щоб побачити записи.
          </p>
        ) : (
          <ul className={styles.cacheList}>
            {cacheEntries.map((entry) => (
              <li key={entry.key} className={styles.cacheRow}>
                <span className={styles.cacheKey}>{entry.key}</span>
                <span
                  className={`${ui.badge} ${
                    queryStatusClassNames[entry.status]
                  }`}
                >
                  {entry.status}
                </span>
                <span>hasData: {String(entry.hasData)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className={ui.note}>
        <strong>Спільний кеш.</strong> Сторінка Products і цей демо-компонент
        використовують один <code>productsApi</code>. Тому після відвідування
        Products запит тут може одразу віддати закешовані дані, поки{' '}
        <code>isFetching</code> оновлює їх у фоні.
      </p>
    </section>
  );
};

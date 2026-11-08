import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

const rtkStatusTranslationKeys = {
  error: 'rtkDemo.status.error',
  loading: 'rtkDemo.status.loading',
  fetching: 'rtkDemo.status.fetching',
  success: 'rtkDemo.status.success',
  uninitialized: 'rtkDemo.status.uninitialized',
} as const;

const getErrorMessage = (error: unknown, fallback: string) => {
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

  return fallback;
};

export const RtkQueryDemo = () => {
  const { t } = useTranslation();
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
    ? { labelKey: rtkStatusTranslationKeys.error, className: ui.badgeError }
    : isLoading
      ? {
          labelKey: rtkStatusTranslationKeys.loading,
          className: ui.badgeLoading,
        }
      : isFetching
        ? {
            labelKey: rtkStatusTranslationKeys.fetching,
            className: ui.badgeLoading,
          }
        : isSuccess
          ? {
              labelKey: rtkStatusTranslationKeys.success,
              className: ui.badgeSuccess,
            }
          : {
              labelKey: rtkStatusTranslationKeys.uninitialized,
              className: ui.badgeIdle,
            };

  const flags = [
    { name: 'isUninitialized', value: isUninitialized },
    { name: 'isLoading', value: isLoading },
    { name: 'isFetching', value: isFetching },
    { name: 'isSuccess', value: isSuccess },
    { name: 'isError', value: isError },
  ];

  const errorMessage = getErrorMessage(error, t('rtkDemo.unknownError'));

  return (
    <section className={ui.panel}>
      <div className={ui.panelHeader}>
        <div>
          <h2 className={ui.panelTitle}>{t('rtkDemo.title')}</h2>
          <p className={ui.panelDescription}>{t('rtkDemo.description')}</p>
        </div>

        <span className={`${ui.badge} ${statusView.className}`}>
          {t(statusView.labelKey)}
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
          <span className={styles.detailLabel}>
            {t('rtkDemo.details.status')}
          </span>
          <span className={styles.detailValue}>{status}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>
            {t('rtkDemo.details.dataLength')}
          </span>
          <span className={styles.detailValue}>{data?.length ?? '—'}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>
            {t('rtkDemo.details.firstProduct')}
          </span>
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
          {t('rtkDemo.actions.run')}
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.ghostButton}`}
          onClick={() => setEnabled(false)}
          disabled={!enabled}
        >
          {t('rtkDemo.actions.skip')}
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.ghostButton}`}
          onClick={() => refetch()}
          disabled={!enabled || isLoading || isFetching}
        >
          {t('rtkDemo.actions.refetch')}
        </button>
      </div>

      <ol className={styles.steps}>
        <li>{t('rtkDemo.steps.one')}</li>
        <li>{t('rtkDemo.steps.two')}</li>
        <li>{t('rtkDemo.steps.three')}</li>
        <li>{t('rtkDemo.steps.four')}</li>
      </ol>

      <div className={styles.cache}>
        <p className={ui.sectionLabel}>{t('rtkDemo.cacheLabel')}</p>
        {cacheEntries.length === 0 ? (
          <p className={styles.empty}>{t('rtkDemo.cacheEmpty')}</p>
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
                <span>
                  {t('rtkDemo.cacheHasData')}: {String(entry.hasData)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className={ui.note}>
        <strong>{t('rtkDemo.noteTitle')}</strong> {t('rtkDemo.noteText')}
      </p>
    </section>
  );
};

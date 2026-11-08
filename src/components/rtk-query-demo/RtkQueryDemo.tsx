import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  demoApi,
  useGetProductsCachedQuery,
  useGetProductsNoCacheQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useUpdateProductPessimisticMutation,
} from '../../features/demo/demoApi';
import type { Product } from '../../types/product';
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

  if (typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return fallback;
};

const formatTimestamp = (timestamp?: number) =>
  timestamp ? new Date(timestamp).toLocaleTimeString() : '—';

interface ProbeResultProps {
  count: number | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
}

const ProbeResult = ({
  count,
  isLoading,
  isFetching,
  isSuccess,
}: ProbeResultProps) => {
  const { t } = useTranslation();

  const flags = [
    { name: 'isLoading', value: isLoading },
    { name: 'isFetching', value: isFetching },
    { name: 'isSuccess', value: isSuccess },
  ];

  return (
    <div className={styles.probeResult}>
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
      <p className={styles.probeCount}>
        {t('rtkDemo.cache.countLabel')}: {count ?? '—'}
      </p>
    </div>
  );
};

const CachedProbe = () => {
  const { data, isLoading, isFetching, isSuccess } =
    useGetProductsCachedQuery();

  return (
    <ProbeResult
      count={data?.length}
      isLoading={isLoading}
      isFetching={isFetching}
      isSuccess={isSuccess}
    />
  );
};

const NoCacheProbe = () => {
  const { data, isLoading, isFetching, isSuccess } =
    useGetProductsNoCacheQuery();

  return (
    <ProbeResult
      count={data?.length}
      isLoading={isLoading}
      isFetching={isFetching}
      isSuccess={isSuccess}
    />
  );
};

export const RtkQueryDemo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
  } = useGetProductsQuery();

  const [updateOptimistic, optimisticState] = useUpdateProductMutation();
  const [updatePessimistic, pessimisticState] =
    useUpdateProductPessimisticMutation();

  const queries = useAppSelector((state) => state.demoApi.queries);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  // null means "show the selected product's price from the server".
  const [price, setPrice] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [showCachedProbe, setShowCachedProbe] = useState(false);
  const [showNoCacheProbe, setShowNoCacheProbe] = useState(false);

  const selectedProduct =
    data?.find((product) => product.id === selectedId) ?? data?.[0];

  const inputPrice =
    price ?? (selectedProduct ? String(selectedProduct.price) : '');

  const cacheEntries = Object.entries(queries).flatMap(([key, entry]) =>
    entry
      ? [
          {
            key,
            status: entry.status,
            hasData: entry.data !== undefined,
            updatedAt: entry.fulfilledTimeStamp,
          },
        ]
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
  const mutationErrorMessage = getErrorMessage(
    optimisticState.error ?? pessimisticState.error,
    t('rtkDemo.unknownError'),
  );

  const parsedPrice = Number(inputPrice);
  const canSave =
    Boolean(selectedProduct) &&
    inputPrice.trim() !== '' &&
    Number.isFinite(parsedPrice) &&
    parsedPrice >= 0;

  const isSaving = optimisticState.isLoading || pessimisticState.isLoading;

  const handleSelectProduct = (product: Product) => {
    setSelectedId(product.id);
    setPrice(null);
    setSaveMessage(null);
  };

  const handleSave = async (mode: 'optimistic' | 'pessimistic') => {
    if (!selectedProduct || !canSave) {
      return;
    }

    setSaveMessage(null);

    const args = {
      id: selectedProduct.id,
      changes: { price: parsedPrice },
      simulateError,
    };

    try {
      if (mode === 'optimistic') {
        await updateOptimistic(args).unwrap();
      } else {
        await updatePessimistic(args).unwrap();
      }

      setSaveMessage(t('rtkDemo.edit.success'));
    } catch {
      // The mutation error itself is rendered from optimisticState.error
      // or pessimisticState.error below. Reset the input so it shows the
      // value that is actually in the cache after the rollback.
      setPrice(null);
    }
  };

  const handleResetCache = () => {
    setSaveMessage(null);
    setPrice(null);
    dispatch(demoApi.util.resetApiState());
  };

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

      <div>
        <p className={ui.sectionLabel}>{t('rtkDemo.flagsLabel')}</p>
        <div className={ui.flags}>
          {flags.map((flag) => (
            <span
              key={flag.name}
              className={`${ui.flag} ${
                flag.value ? ui.flagTrue : ui.flagFalse
              }`}
            >
              {flag.name}: {String(flag.value)}
            </span>
          ))}
        </div>
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
            {t('rtkDemo.details.selected')}
          </span>
          <span className={styles.detailValue}>
            {selectedProduct?.title ?? '—'}
          </span>
        </div>
      </div>

      <div className={styles.compare}>
        <div
          className={`${styles.compareCard} ${
            isLoading ? styles.compareCardActive : ''
          }`}
        >
          <div className={styles.compareHeader}>
            <span className={styles.compareTitle}>
              {t('rtkDemo.loadingVsFetching.isLoadingTitle')}
            </span>
            <span
              className={`${ui.badge} ${
                isLoading ? ui.badgeLoading : ui.badgeIdle
              }`}
            >
              {String(isLoading)}
            </span>
          </div>
          <p className={styles.compareText}>
            {t('rtkDemo.loadingVsFetching.isLoadingText')}
          </p>
        </div>

        <div
          className={`${styles.compareCard} ${
            isFetching ? styles.compareCardActive : ''
          }`}
        >
          <div className={styles.compareHeader}>
            <span className={styles.compareTitle}>
              {t('rtkDemo.loadingVsFetching.isFetchingTitle')}
            </span>
            <span
              className={`${ui.badge} ${
                isFetching ? ui.badgeLoading : ui.badgeIdle
              }`}
            >
              {String(isFetching)}
            </span>
          </div>
          <p className={styles.compareText}>
            {t('rtkDemo.loadingVsFetching.isFetchingText')}
          </p>
        </div>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <div className={ui.actions}>
        <button
          type="button"
          className={ui.button}
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
        >
          {t('rtkDemo.actions.refetch')}
        </button>
        <button
          type="button"
          className={`${ui.button} ${ui.dangerButton}`}
          onClick={handleResetCache}
        >
          {t('rtkDemo.actions.resetCache')}
        </button>
      </div>

      <ol className={styles.steps}>
        <li>{t('rtkDemo.steps.one')}</li>
        <li>{t('rtkDemo.steps.two')}</li>
        <li>{t('rtkDemo.steps.three')}</li>
        <li>{t('rtkDemo.steps.four')}</li>
      </ol>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            {t('rtkDemo.productsHeading')}
          </h3>
          {isFetching && !isLoading && (
            <span className={styles.refreshing}>
              <span className={styles.spinner} aria-hidden="true" />
              {t('rtkDemo.refreshing')}
            </span>
          )}
        </div>

        {isLoading && <p className={styles.empty}>{t('rtkDemo.loadingProducts')}</p>}

        {data && data.length > 0 && (
          <ul className={styles.products}>
            {data.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  className={`${styles.productCard} ${
                    selectedProduct?.id === product.id
                      ? styles.selectedProduct
                      : ''
                  }`}
                  onClick={() => handleSelectProduct(product)}
                  aria-pressed={selectedProduct?.id === product.id}
                >
                  <span className={styles.productTitle}>{product.title}</span>
                  <span className={styles.productPrice}>
                    ${product.price}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('rtkDemo.edit.heading')}</h3>
        <p className={styles.hint}>{t('rtkDemo.edit.hint')}</p>

        {selectedProduct ? (
          <div className={styles.editor}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>
                {selectedProduct.title}
              </span>
              <span className={styles.fieldValue}>
                ${selectedProduct.price}
              </span>
            </div>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                {t('rtkDemo.edit.priceLabel')}
              </span>
              <input
                className={styles.input}
                type="number"
                min="0"
                step="1"
                value={inputPrice}
                onChange={(event) => setPrice(event.target.value)}
              />
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(event) => setSimulateError(event.target.checked)}
              />
              <span>{t('rtkDemo.edit.simulateError')}</span>
            </label>

            <p className={styles.hint}>{t('rtkDemo.edit.simulateErrorHint')}</p>

            <div className={ui.actions}>
              <button
                type="button"
                className={ui.button}
                onClick={() => handleSave('optimistic')}
                disabled={!canSave || isSaving}
              >
                {optimisticState.isLoading
                  ? t('rtkDemo.edit.optimisticSaving')
                  : t('rtkDemo.edit.optimistic')}
              </button>
              <button
                type="button"
                className={`${ui.button} ${ui.ghostButton}`}
                onClick={() => handleSave('pessimistic')}
                disabled={!canSave || isSaving}
              >
                {pessimisticState.isLoading
                  ? t('rtkDemo.edit.pessimisticSaving')
                  : t('rtkDemo.edit.pessimistic')}
              </button>
            </div>

            {mutationErrorMessage && (
              <p className={styles.error}>{mutationErrorMessage}</p>
            )}
            {saveMessage && <p className={styles.success}>{saveMessage}</p>}
          </div>
        ) : (
          <p className={styles.empty}>{t('rtkDemo.edit.noProduct')}</p>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('rtkDemo.cache.heading')}</h3>
        <p className={styles.hint}>{t('rtkDemo.cache.hint')}</p>

        <div className={styles.probes}>
          <div className={styles.probe}>
            <div className={styles.probeHeader}>
              <h4 className={styles.probeTitle}>
                {t('rtkDemo.cache.cachedTitle')}
              </h4>
              <button
                type="button"
                className={`${ui.button} ${ui.ghostButton}`}
                onClick={() => setShowCachedProbe((current) => !current)}
              >
                {showCachedProbe
                  ? t('rtkDemo.cache.unmount')
                  : t('rtkDemo.cache.mount')}
              </button>
            </div>
            <p className={styles.hint}>{t('rtkDemo.cache.cachedHint')}</p>
            {showCachedProbe ? (
              <CachedProbe />
            ) : (
              <p className={styles.probeEmpty}>
                {t('rtkDemo.cache.unmounted')}
              </p>
            )}
          </div>

          <div className={styles.probe}>
            <div className={styles.probeHeader}>
              <h4 className={styles.probeTitle}>
                {t('rtkDemo.cache.noCacheTitle')}
              </h4>
              <button
                type="button"
                className={`${ui.button} ${ui.ghostButton}`}
                onClick={() => setShowNoCacheProbe((current) => !current)}
              >
                {showNoCacheProbe
                  ? t('rtkDemo.cache.unmount')
                  : t('rtkDemo.cache.mount')}
              </button>
            </div>
            <p className={styles.hint}>{t('rtkDemo.cache.noCacheHint')}</p>
            {showNoCacheProbe ? (
              <NoCacheProbe />
            ) : (
              <p className={styles.probeEmpty}>
                {t('rtkDemo.cache.unmounted')}
              </p>
            )}
          </div>
        </div>

        <div className={styles.cache}>
          <p className={ui.sectionLabel}>
            {t('rtkDemo.cache.entriesHeading')}
          </p>
          {cacheEntries.length === 0 ? (
            <p className={styles.empty}>
              {t('rtkDemo.cache.entriesEmpty')}
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
                  <span>
                    {t('rtkDemo.cache.hasData')}: {String(entry.hasData)}
                  </span>
                  <span>
                    {t('rtkDemo.cache.updatedAt')}:{' '}
                    {formatTimestamp(entry.updatedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className={ui.note}>
        <strong>{t('rtkDemo.noteTitle')}</strong> {t('rtkDemo.noteText')}
      </p>
    </section>
  );
};

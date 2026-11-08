import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductsAdapterDemo } from '../components/products-adapter-demo/ProductsAdapterDemo';
import { RtkQueryDemo } from '../components/rtk-query-demo/RtkQueryDemo';
import styles from './AdapterDemoPage.module.scss';

type DemoTab = 'entity' | 'query';

interface DemoTabConfig {
  id: DemoTab;
  labelKey: 'demoPage.tabs.entity' | 'demoPage.tabs.query';
}

const tabs: DemoTabConfig[] = [
  { id: 'entity', labelKey: 'demoPage.tabs.entity' },
  { id: 'query', labelKey: 'demoPage.tabs.query' },
];

export const AdapterDemoPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<DemoTab>('entity');

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('demoPage.title')}</h1>
        <p className={styles.subtitle}>{t('demoPage.subtitle')}</p>
      </header>

      <nav className={styles.tabs} aria-label={t('demoPage.ariaLabel')}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </nav>

      {activeTab === 'entity' ? <ProductsAdapterDemo /> : <RtkQueryDemo />}
    </section>
  );
};

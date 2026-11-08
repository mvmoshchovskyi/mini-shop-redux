import { useState } from 'react';

import { ProductsAdapterDemo } from '../components/products-adapter-demo/ProductsAdapterDemo';
import { RtkQueryDemo } from '../components/rtk-query-demo/RtkQueryDemo';
import styles from './AdapterDemoPage.module.scss';

type DemoTab = 'entity' | 'query';

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: 'entity', label: 'Redux + createEntityAdapter' },
  { id: 'query', label: 'RTK Query' },
];

export const AdapterDemoPage = () => {
  const [activeTab, setActiveTab] = useState<DemoTab>('entity');

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Redux learning lab</h1>
        <p className={styles.subtitle}>
          Один список товарів — дві реалізації. Перемикайте вкладки, щоб
          порівняти нормалізоване сховище Redux з <code>createEntityAdapter</code>{' '}
          та кеш RTK Query з його станами.
        </p>
      </header>

      <nav className={styles.tabs} aria-label="Демо-розділи">
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
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'entity' ? <ProductsAdapterDemo /> : <RtkQueryDemo />}
    </section>
  );
};

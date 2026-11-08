import type en from './en';

// typeof en guarantees that the Ukrainian dictionary has the same keys.
const uk: typeof en = {
  common: {
    appName: 'Міні Магазин',
    products: 'Товари',
    reduxDemo: 'Redux демо',
    cart: 'Кошик',
    language: 'Мова',
  },
  shopPage: {
    title: 'Сторінка товарів',
  },
  productList: {
    heading: 'Список товарів',
    loading: 'Завантаження...',
    updating: 'Оновлення товарів...',
    error: 'Щось пішло не так',
    addProduct: 'Додати товар',
    adding: 'Додавання...',
    refresh: 'Оновити',
  },
  productCard: {
    addToCart: 'Додати в кошик',
    updateProduct: 'Оновити товар',
    updating: 'Оновлення...',
  },
  cart: {
    title: 'Кошик ({{count}})',
    remove: 'Видалити',
    total: 'Разом: ${{total}}',
  },
  demoPage: {
    title: 'Лабораторія Redux',
    subtitle:
      'Один список товарів — дві реалізації. Перемикайте вкладки, щоб порівняти нормалізоване сховище Redux з createEntityAdapter та кеш RTK Query з його станами.',
    ariaLabel: 'Демо-розділи',
    tabs: {
      entity: 'Redux + createEntityAdapter',
      query: 'RTK Query',
    },
  },
  adapterDemo: {
    title: 'Redux + createEntityAdapter',
    description:
      'Дані зберігаються у нормалізованому вигляді: ids — масив ідентифікаторів, entities — словник id → product. Селектори adapter читають цю структуру, а reducers adapter змінюють її.',
    status: {
      idle: 'Очікування',
      loading: 'Завантаження',
      ready: 'Готово',
      error: 'Помилка',
    },
    stats: {
      total: 'selectTotal',
      idsLength: 'ids.length',
      entitiesKeys: 'entities keys',
      ids: 'ids',
    },
    actions: {
      load: 'Завантажити товари',
      loading: 'Завантаження...',
      add: 'Додати локальний товар',
      updatePrice: 'Збільшити ціну на 10',
      remove: 'Видалити вибраний',
      clear: 'clearProducts()',
    },
    selectLabel: 'Вибір id для selectById',
    selectEmpty: 'Немає товарів',
    selectResult: 'Результат selectById',
    empty: 'Товарів немає. Натисніть «Завантажити товари» або «Додати локальний товар».',
    debugLabel: 'Нормалізований state.products (ids + entities)',
    noteTitle: 'Навіщо це потрібно?',
    noteText:
      'Замість пошуку по масиву find() ви отримуєте товар за O(1) через selectById. А updateOne змінює лише один запис, не перебираючи весь список.',
  },
  rtkDemo: {
    title: 'RTK Query',
    description:
      'Запит стартує лише після skip: false. Поки запит не запускався, стан — uninitialized. Далі RTK Query проходить через pending до fulfilled або rejected.',
    status: {
      error: 'Помилка',
      loading: 'Завантаження',
      fetching: 'Оновлення',
      success: 'Успіх',
      uninitialized: 'Не ініціалізовано',
    },
    details: {
      status: 'status',
      dataLength: 'data.length',
      firstProduct: 'перший товар',
    },
    actions: {
      run: 'Запустити запит',
      skip: 'Пропустити запит',
      refetch: 'Оновити',
    },
    steps: {
      one: 'isUninitialized — запит ще не запускався (або компонент пропускає його через skip).',
      two: 'isLoading — триває перший запит, даних у кеші ще немає.',
      three:
        'isFetching — будь-який запит у процесі. Під час фонового refetch він true, але дані вже показані.',
      four: 'isSuccess / isError — запит завершився успішно або з помилкою.',
    },
    cacheLabel: 'Кеш RTK Query: state.productsApi.queries',
    cacheEmpty: 'Кеш порожній. Натисніть «Запустити запит», щоб побачити записи.',
    cacheHasData: 'hasData',
    noteTitle: 'Спільний кеш.',
    noteText:
      'Сторінка Products і цей демо-компонент використовують один productsApi. Тому після відвідування Products запит тут може одразу віддати закешовані дані, поки isFetching оновлює їх у фоні.',
    unknownError: 'Невідома помилка',
  },
};

export default uk;

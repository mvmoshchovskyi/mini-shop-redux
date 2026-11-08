import type en from './en';

// typeof en guarantees that the Ukrainian dictionary has the same keys.
const uk: typeof en = {
  common: {
    appName: 'Міні Магазин',
    products: 'Товари',
    reduxDemo: 'Redux демо',
    cart: 'Кошик',
    language: 'Мова',
    light: 'Світла',
    dark: 'Темна',
    switchToLight: 'Увімкнути світлу тему',
    switchToDark: 'Увімкнути темну тему',
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
      'Ця сторінка використовує локальний фейковий сервер замість fakestoreapi. Він додає реальну затримку, справді зберігає зміни і може навмисно відхилити mutation. Так видно кешування, loading, fetching та optimistic updates.',
    status: {
      error: 'Помилка',
      loading: 'Завантаження',
      fetching: 'Оновлення',
      success: 'Успіх',
      uninitialized: 'Не ініціалізовано',
    },
    flagsLabel: 'Прапорці запиту',
    details: {
      status: 'status',
      dataLength: 'data.length',
      selected: 'вибраний товар',
    },
    actions: {
      refetch: 'Оновити',
      resetCache: 'Скинути кеш RTK Query',
    },
    steps: {
      one: 'isUninitialized — запит ще не запускався (або компонент пропускає його через skip).',
      two: 'isLoading — триває перший запит, даних у кеші ще немає.',
      three:
        'isFetching — будь-який запит у процесі. Під час фонового refetch він true, але дані вже показані.',
      four: 'isSuccess / isError — запит завершився успішно або з помилкою.',
    },
    productsHeading: 'Товари із закешованого запиту',
    loadingProducts: 'Завантаження товарів...',
    refreshing: 'Оновлення у фоні...',
    loadingVsFetching: {
      heading: 'isLoading проти isFetching',
      isLoadingTitle: 'isLoading',
      isLoadingText:
        'Дорівнює true лише для першого запиту, коли в кеші ще немає даних. Використовуйте для скелетона або повноекранного лоадера.',
      isFetchingTitle: 'isFetching',
      isFetchingText:
        'Дорівнює true для будь-якого запиту, включно з фоновим refetch. Використовуйте для маленького спінера або progress bar, поки старі дані залишаються на екрані.',
    },
    edit: {
      heading: 'Optimistic update проти оновлення після сервера',
      hint: 'Обидві кнопки оновлюють один і той самий фейковий сервер. Optimistic одразу змінює кеш і відкочує зміну при помилці. Друга кнопка чекає відповідь сервера і лише потім перезапитує список.',
      priceLabel: 'Нова ціна',
      simulateError: 'Імітувати помилку сервера',
      simulateErrorHint:
        'Фейковий сервер відхилить mutation із затримкою, щоб було видно, як optimistic-зміна відкочується.',
      optimistic: 'Зберегти оптимістично',
      optimisticSaving: 'Оптимістичне збереження...',
      pessimistic: 'Дочекатися сервера',
      pessimisticSaving: 'Очікування відповіді сервера...',
      success: 'Збережено. RTK Query оновлює список у фоні.',
      noProduct: 'Ще немає товару для редагування.',
    },
    cache: {
      heading: 'Кеш проти відсутності кешу',
      hint: 'Обидва запити звертаються до одного фейкового сервера. Різниця лише в keepUnusedDataFor.',
      cachedTitle: 'Закешований запит',
      cachedHint:
        'keepUnusedDataFor: 60 с. Розмонтуйте, а потім змонтуйте знову — дані одразу прийдуть із кешу.',
      noCacheTitle: 'Запит без кешу',
      noCacheHint:
        'keepUnusedDataFor: 0 с. Після розмонтування запис кешу видаляється, тому повторне монтування починається з isLoading.',
      mount: 'Змонтувати запит',
      unmount: 'Розмонтувати запит',
      unmounted: 'Розмонтовано. Подивіться на записи кешу нижче.',
      countLabel: 'data.length',
      entriesHeading: 'Записи кешу: state.demoApi.queries',
      entriesEmpty: 'Кеш порожній.',
      hasData: 'hasData',
      updatedAt: 'оновлено',
    },
    noteTitle: 'Навіщо фейковий сервер?',
    noteText:
      'fakestoreapi не зберігає PUT/POST: він відповідає успіхом, але наступний GET повертає старі дані. Тут фейковий сервер тримає зміни в пам’яті, тому optimistic updates і rollback поводяться як справжній API до перезавантаження сторінки.',
    unknownError: 'Невідома помилка',
  },
};

export default uk;

const en = {
  common: {
    appName: 'Mini Shop',
    products: 'Products',
    reduxDemo: 'Redux demo',
    cart: 'Cart',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },
  shopPage: {
    title: 'Products page',
  },
  productList: {
    heading: 'Product list',
    loading: 'Loading...',
    updating: 'Updating products...',
    error: 'Something went wrong',
    addProduct: 'Add product',
    adding: 'Adding...',
    refresh: 'Refresh',
  },
  productCard: {
    addToCart: 'Add to cart',
    updateProduct: 'Update product',
    updating: 'Updating...',
  },
  cart: {
    title: 'Cart ({{count}})',
    remove: 'Remove',
    total: 'Total: ${{total}}',
  },
  demoPage: {
    title: 'Redux learning lab',
    subtitle:
      'One product list — two implementations. Switch tabs to compare the normalized Redux store with createEntityAdapter and the RTK Query cache with its states.',
    ariaLabel: 'Demo sections',
    tabs: {
      entity: 'Redux + createEntityAdapter',
      query: 'RTK Query',
    },
  },
  adapterDemo: {
    title: 'Redux + createEntityAdapter',
    description:
      'Data is stored in a normalized shape: ids is an array of identifiers, entities is an id → product dictionary. Adapter selectors read this structure, and adapter reducers update it.',
    status: {
      idle: 'Idle',
      loading: 'Loading',
      ready: 'Ready',
      error: 'Error',
    },
    stats: {
      total: 'selectTotal',
      idsLength: 'ids.length',
      entitiesKeys: 'entities keys',
      ids: 'ids',
    },
    actions: {
      load: 'Load products',
      loading: 'Loading...',
      add: 'Add local product',
      updatePrice: 'Update price +10',
      remove: 'Remove selected',
      clear: 'clearProducts()',
    },
    selectLabel: 'Choose an id for selectById',
    selectEmpty: 'No products',
    selectResult: 'selectById result',
    empty: 'No products yet. Press “Load products” or “Add local product”.',
    debugLabel: 'Normalized state.products (ids + entities)',
    noteTitle: 'Why does this matter?',
    noteText:
      'Instead of searching an array with find(), you get a product in O(1) through selectById. And updateOne changes only one record without iterating the whole list.',
  },
  rtkDemo: {
    title: 'RTK Query',
    description:
      'The query starts only after skip: false. Until it is started, the state is uninitialized. Then RTK Query moves through pending to fulfilled or rejected.',
    status: {
      error: 'Error',
      loading: 'Loading',
      fetching: 'Fetching',
      success: 'Success',
      uninitialized: 'Uninitialized',
    },
    details: {
      status: 'status',
      dataLength: 'data.length',
      firstProduct: 'first product',
    },
    actions: {
      run: 'Run query',
      skip: 'Skip query',
      refetch: 'Refetch',
    },
    steps: {
      one: 'isUninitialized — the query has not started yet (or the component skips it with skip).',
      two: 'isLoading — the first request is in flight and there is no cached data yet.',
      three:
        'isFetching — any request is in flight. During a background refetch it is true, but the data is already displayed.',
      four: 'isSuccess / isError — the request finished successfully or with an error.',
    },
    cacheLabel: 'RTK Query cache: state.productsApi.queries',
    cacheEmpty: 'The cache is empty. Press “Run query” to see entries.',
    cacheHasData: 'hasData',
    noteTitle: 'Shared cache.',
    noteText:
      'The Products page and this demo component use the same productsApi. So after visiting Products, this query may immediately return cached data while isFetching refreshes it in the background.',
    unknownError: 'Unknown error',
  },
};

export default en;

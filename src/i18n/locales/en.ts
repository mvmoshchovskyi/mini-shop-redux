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
      'This page uses a local fake server instead of fakestoreapi. It adds real latency, actually saves edits, and can reject a mutation on purpose. That makes caching, loading, fetching and optimistic updates visible.',
    status: {
      error: 'Error',
      loading: 'Loading',
      fetching: 'Fetching',
      success: 'Success',
      uninitialized: 'Uninitialized',
    },
    flagsLabel: 'Query flags',
    details: {
      status: 'status',
      dataLength: 'data.length',
      selected: 'selected product',
    },
    actions: {
      refetch: 'Refetch',
      resetCache: 'Reset RTK Query cache',
    },
    steps: {
      one: 'isUninitialized — the query has not started yet (or the component skips it with skip).',
      two: 'isLoading — the first request is in flight and there is no cached data yet.',
      three:
        'isFetching — any request is in flight. During a background refetch it is true, but the data is already displayed.',
      four: 'isSuccess / isError — the request finished successfully or with an error.',
    },
    productsHeading: 'Products from the cached query',
    loadingProducts: 'Loading products...',
    refreshing: 'Refreshing in the background...',
    loadingVsFetching: {
      heading: 'isLoading vs isFetching',
      isLoadingTitle: 'isLoading',
      isLoadingText:
        'True only for the first request, when the cache has no data. Use it for a skeleton or a full-page loader.',
      isFetchingTitle: 'isFetching',
      isFetchingText:
        'True for any request, including a background refetch. Use it for a small spinner or progress bar while the old data stays on screen.',
    },
    edit: {
      heading: 'Optimistic update vs server-first update',
      hint: 'Both buttons update the same fake server. The optimistic one changes the cache immediately and rolls back on error. The server-first one waits for the response, and only then refetches the list.',
      priceLabel: 'New price',
      simulateError: 'Simulate a server error',
      simulateErrorHint:
        'The fake server rejects the mutation after a delay, so you can watch the optimistic patch being undone.',
      optimistic: 'Save optimistically',
      optimisticSaving: 'Saving optimistically...',
      pessimistic: 'Wait for the server',
      pessimisticSaving: 'Waiting for the server...',
      success: 'Saved. RTK Query is refetching the list in the background.',
      noProduct: 'There is no product to edit yet.',
    },
    cache: {
      heading: 'Cache vs no cache',
      hint: 'Both probes call the same fake server. The only difference is keepUnusedDataFor.',
      cachedTitle: 'Cached query',
      cachedHint:
        'keepUnusedDataFor: 60 s. Unmount it, then mount it again — the data comes from the cache instantly.',
      noCacheTitle: 'No-cache query',
      noCacheHint:
        'keepUnusedDataFor: 0 s. Unmounting removes the cache entry, so mounting again starts with isLoading.',
      mount: 'Mount query',
      unmount: 'Unmount query',
      unmounted: 'Unmounted. Look at the cache entries below.',
      countLabel: 'data.length',
      entriesHeading: 'Cache entries: state.demoApi.queries',
      entriesEmpty: 'The cache is empty.',
      hasData: 'hasData',
      updatedAt: 'updated',
    },
    noteTitle: 'Why a fake server?',
    noteText:
      'fakestoreapi does not persist PUT/POST requests: it answers with success but the next GET returns the old data. Here the fake server keeps changes in memory, so optimistic updates and rollbacks behave like a real API until the page is reloaded.',
    unknownError: 'Unknown error',
  },
};

export default en;

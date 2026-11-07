import type { Middleware } from '@reduxjs/toolkit';

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    console.log('action:', action);

    const result = next(action);

    console.log('state:', store.getState());

    return result;
};

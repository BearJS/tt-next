import logger from 'redux-logger';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchReducer';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware(getDefaultMiddlewares) {
    if (process.env.NODE_ENV !== 'production') {
      return getDefaultMiddlewares()
        .concat(logger)
        .concat(thunk as ThunkMiddleware);
    }
    return getDefaultMiddlewares().concat(thunk as ThunkMiddleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

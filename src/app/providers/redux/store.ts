import logger from 'redux-logger';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import searchReducer from './searchReducer';
import notificationReducer from './notificationReducer';

// @ts-ignore
export const store = configureStore({
  reducer: {
    search: searchReducer,
    notification: notificationReducer,
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
// ts-ignore
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type ThunkAPI = {
  dispatch: AppDispatch;
  state: AppState;
  rejectValue: SerializedError;
};

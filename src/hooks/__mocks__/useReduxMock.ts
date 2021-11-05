import {RootState} from '../../state/store';

export const stateMock: RootState = {
  notification: [],
  search: {
    loading: 'idle',
    currentRequestId: undefined,
    error: undefined,
    results: [],
  },
};

type ValueOf<T> = T[keyof T];
type SelectorFn = (state: RootState) => ValueOf<RootState>;

export const useAppSelectorMock = (fn: SelectorFn): ValueOf<RootState> => fn(stateMock);

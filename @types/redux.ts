type SerializedError = import('@reduxjs/toolkit').SerializedError;

type ThunkLoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

interface ThunkDefaultState {
  loading: ThunkLoadingState;
  currentRequestId?: string;
  error?: SerializedError;
}

interface AppState {
  search: SearchState;
}

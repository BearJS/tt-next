import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import {ThunkAPI} from '../../app/store';

type Query = {term: string}; // Record<string, string>;

const name = 'search';

export const searchByArtistCollectionSong = createAsyncThunk<
  // Return type of the payload creator
  iTunesSearchResult[],
  // First argument to the payload creator
  Query,
  // Types for ThunkAPI
  ThunkAPI
>(
  `${name}/fetchByIdStatus`,
  async (query: Query, {getState, requestId}): Promise<iTunesSearchResult[]> => {
    const {currentRequestId, loading} = getState().search;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return [];
    }
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`https://itunes.apple.com/search?${queryString}`);

    const {results} = await response.json();

    return results as iTunesSearchResult[];
  }
);

const initialState: SearchState = {
  results: [],
  loading: 'idle',
  currentRequestId: undefined,
};

// Then, handle actions in your reducers:
const searchSlice = createSlice({
  name,
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder: ActionReducerMapBuilder<SearchState>) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(searchByArtistCollectionSong.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(searchByArtistCollectionSong.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.results = [...state.results, ...action.payload];
          state.currentRequestId = undefined;
        }
      })
      .addCase(searchByArtistCollectionSong.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export default searchSlice.reducer;

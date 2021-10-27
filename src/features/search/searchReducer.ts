import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import {iTunesSearchByArtistCollectionSong} from '../../api/iTunesSearchAPI';
import {AppDispatch, RootState} from '../../app/store';

type Query = {term: string}; // Record<string, string>;

const name = 'search';

export const searchByArtistCollectionSong = createAsyncThunk<
  // Return type of the payload creator
  iTunesSearchResult[],
  // First argument to the payload creator
  Query,
  // Types for ThunkAPI
  {dispatch: AppDispatch; state: RootState; rejectValue: string}
>(
  `${name}/fetchByIdStatus`,
  async (query: Query, {getState, requestId}): Promise<iTunesSearchResult[]> => {
    const {currentRequestId, loading} = getState().search;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return [];
    }

    return (await iTunesSearchByArtistCollectionSong(query)) as iTunesSearchResult[];
  }
);

const initialState: SearchState = {
  results: [],
  loading: 'idle',
  currentRequestId: undefined,
};

// Then, handle actions in your reducers:
const searchSlice = createSlice<SearchState, SliceCaseReducers<RootState>, 'search'>({
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

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123));

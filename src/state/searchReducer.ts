import {ActionReducerMapBuilder, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ThunkAPI} from './store';
import {addNotification} from './notificationReducer';
import iTunesSearchAPI from '../api/iTunesSearchAPI';

const name = 'search';

export const searchByArtistCollectionSong = createAsyncThunk<
  // Return type of the payload creator
  iTunesSearchResult[],
  // First argument to the payload creator
  iTunesSearchQueryParams,
  // Types for ThunkAPI
  ThunkAPI
>(
  `${name}/fetchByIdStatus`,
  async (
    query: iTunesSearchQueryParams,
    {getState, requestId, dispatch}
  ): Promise<iTunesSearchResult[]> => {
    const {currentRequestId, loading} = getState().search;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return [];
    }

    const results = await iTunesSearchAPI(query);
    const resultsCount = results.length;

    if (resultsCount === 0) {
      dispatch(
        addNotification({
          type: 'warning',
          message: `No results found for search term "${query.term}"`,
        })
      );
    }

    if (resultsCount === 200) {
      dispatch(
        addNotification({
          type: 'info',
          heading: 'Search Results Limit Reached',
          message: `You have reached the search results limit of 200 results. Please refine your search if you do not see the result you are after.`,
        })
      );
    }

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
          state.results = action.payload;
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

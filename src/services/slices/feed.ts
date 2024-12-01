import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '../../utils/burger-api';
import { TOrder, TOrdersData } from '../../utils/types';

export const getFeeds = createAsyncThunk<TFeedsResponse>(
  'feed/getFeeds',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

type TFeedState = {
  total: TOrdersData | number;
  totalToday: TOrdersData | number;
  orders: TOrder[] | [];
  loadingFeed: boolean;
};

export const initialState: TFeedState = {
  total: 0,
  totalToday: 0,
  orders: [],
  loadingFeed: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setTotal: (state, action: PayloadAction<number>): void => {
      state.total = action.payload;
    },
    setTotalToday: (state, action: PayloadAction<number>): void => {
      state.totalToday = action.payload;
    },
    setFeed: (state, action: PayloadAction<TOrder[]>): void => {
      state.orders = action.payload;
    }
  },
  selectors: {
    getLoadingFeed: (state: TFeedState) => state.loadingFeed,
    getTotal: (state: TFeedState) => state.total,
    getTotalToday: (state: TFeedState) => state.totalToday,
    getFeed: (state: TFeedState) => state.orders
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loadingFeed = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loadingFeed = false;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.loadingFeed = false;
      });
  }
});

export const { setFeed, setTotal, setTotalToday } = feedSlice.actions;
export const { getLoadingFeed, getTotal, getTotalToday, getFeed } =
  feedSlice.selectors;

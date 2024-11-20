import { getFeedsApi, getOrdersApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const getOrdersData = createAsyncThunk<TFeedsResponse>(
  'feed/getOrdersData',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

export const getOrders = createAsyncThunk('feed/getOrders', async () => {
  const data = await getOrdersApi();
  return data;
});

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
    setOrders: (state, action: PayloadAction<TOrder[]>): void => {
      state.orders = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>): void => {
      state.total = action.payload;
    },
    setTotalToday: (state, action: PayloadAction<number>): void => {
      state.totalToday = action.payload;
    }
  },
  selectors: {
    getOrdersFeedSelector: (state: TFeedState) => state.orders,
    getLoadingFeed: (state: TFeedState) => state.loadingFeed,
    getTotal: (state: TFeedState) => state.total,
    getTotalToday: (state: TFeedState) => state.totalToday
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrdersData.pending, (state) => {
        state.loadingFeed = true;
      })
      .addCase(getOrdersData.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loadingFeed = false;
      })
      .addCase(getOrdersData.rejected, (state) => {
        state.loadingFeed = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.loadingFeed = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loadingFeed = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.loadingFeed = false;
      });
  }
});

export const { setOrders } = feedSlice.actions;
export const {
  getOrdersFeedSelector,
  getLoadingFeed,
  getTotal,
  getTotalToday
} = feedSlice.selectors;

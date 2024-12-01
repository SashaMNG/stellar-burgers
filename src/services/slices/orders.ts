import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getOrders = createAsyncThunk('feed/getOrders', async () => {
  const data = await getOrdersApi();
  return data;
});

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (orderNumber: number) => {
    const data = await getOrderByNumberApi(orderNumber);
    return data.orders.length > 0 ? data.orders[0] : null;
  }
);

type TOrdersState = {
  order: TOrder | null;
  orders: TOrder[] | [];
  isLoading: boolean;
};

export const initialState: TOrdersState = {
  order: null,
  orders: [],
  isLoading: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state: TOrdersState) => state.orders,
    getOrdersIsLoading: (state: TOrdersState) => state.isLoading
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const { getOrdersSelector, getOrdersIsLoading } = ordersSlice.selectors;

import { getOrderByNumberApi, orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const orderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/orderBurger',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data;
  }
);

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TOrderState = {
  order: null,
  loading: false,
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<TOrder>): void => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrder: (state: TOrderState) => state.order,
    getOrderIsLoading: (state: TOrderState) => state.loading,
    getOrderRequest: (state: TOrderState) => state.orderRequest,
    getOrderModalData: (state: TOrderState) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.orderRequest = true; // Запрос начинается
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.orderRequest = false; // Запрос завершен
        state.orderModalData = action.payload.order; // Сохраняем данные заказа для модалки
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
        state.orderRequest = false;
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
      });
  }
});

export const { setOrder, clearOrder } = orderSlice.actions;
export const {
  getOrder,
  getOrderIsLoading,
  getOrderRequest,
  getOrderModalData
} = orderSlice.selectors;

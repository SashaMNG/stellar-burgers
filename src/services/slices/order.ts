import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const orderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/orderBurger',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
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

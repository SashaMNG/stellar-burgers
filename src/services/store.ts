import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from './slices/constructor';
import { feedSlice } from './slices/feed';
import { ingredientsSlice } from './slices/ingredients';
import { orderSlice } from './slices/order';
import { ordersSlice } from './slices/orders';
import { userSlice } from './slices/user';

export const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  ordersSlice,
  feedSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

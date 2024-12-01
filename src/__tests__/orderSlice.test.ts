import { getOrderByNumber } from 'src/services/slices/orders'
import {
  initialState,
  orderBurger,
  orderSlice
} from '../services/slices/order';

const mockOrder = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    }
  ],
  _id: '67474cd6b27b06001c3eb764',
  owner: {
    name: 'Александр',
    email: 'saashaaa@yandex.ru',
    createdAt: '2024-11-19T12:47:11.364Z',
    updatedAt: '2024-11-19T17:25:40.341Z'
  },
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2024-11-27T16:46:14.481Z',
  updatedAt: '2024-11-27T16:46:15.431Z',
  number: 60799,
  price: 1976
};

describe('orderSlice test', () => {
  it('should return the initial state', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setOrder action', () => {
    const action = {
      type: orderSlice.actions.setOrder.type,
      payload: mockOrder
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.order).toEqual(mockOrder);
  });

  it('should handle clearOrder action', () => {
    const action = {
      type: orderSlice.actions.clearOrder.type
    };
    const state = orderSlice.reducer({ ...initialState }, action);
    expect(state.order).toBeNull();
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });

  it('should handle orderBurger.pending action', () => {
    const action = { type: orderBurger.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.orderRequest).toBe(true);
  });

  it('should handle orderBurger.fulfilled action', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: {
        success: true,
        order: mockOrder
      }
    };
    const prevState = { ...initialState };
    const state = orderSlice.reducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.order).toEqual(mockOrder);
    expect(state.orderRequest).toBe(false);
  });

  it('should handle orderBurger.rejected action', () => {
    const action = {
      type: orderBurger.rejected.type
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
  });

 
});

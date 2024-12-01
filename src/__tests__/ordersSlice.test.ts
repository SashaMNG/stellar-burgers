import {
  getOrderByNumber,
  getOrders,
  initialState,
  ordersSlice
} from '../services/slices/orders';

const mockOrders = {
  orders: [
    {
      _id: '674819e6b27b06001c3eb88',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-11-28T07:21:10.899Z',
      updatedAt: '2024-11-28T07:21:13.384Z',
      number: 60824
    }
  ]
};

describe('ordersSlice test', () => {
  it('should return the initial state', () => {
    expect(ordersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle getOrders.pending action', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should handle getOrders.fulfilled action', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: {
        success: true,
        orders: mockOrders.orders
      }
    };
    const prevState = { ...initialState };
    const state = ordersSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders.orders);
  });

  it('should handle getOrders.rejected action', () => {
    const action = {
      type: getOrders.rejected.type
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  it('should handle getOrderByNumber.pending action', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should handle getOrderByNumber.fulfilled action', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrders.orders
    };
    const prevState = { ...initialState };
    const state = ordersSlice.reducer(prevState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrders.orders);
  });

  it('should handle getOrderByNumber.rejected action', () => {
    const action = {
      type: getOrderByNumber.rejected.type
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });
});

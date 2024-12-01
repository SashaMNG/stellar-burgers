import { feedSlice, getFeeds, initialState } from '../services/slices/feed';

const mockFeed = {
  total: 60450,
  totalToday: 105,
  orders: ['674819e6b27b06001c3eb88b', '67478bc1b27b06001c3eb836']
};

describe('feedSlice test', () => {
  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle getFeeds.pending action', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.loadingFeed).toBe(true);
  });

  it('should handle getFeeds.fulfilled action', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: {
        success: true,
        orders: mockFeed.orders,
        total: mockFeed.total,
        totalToday: mockFeed.totalToday
      }
    };
    const prevState = { ...initialState };
    const state = feedSlice.reducer(prevState, action);
    expect(state.loadingFeed).toBe(false);
    expect(state.orders).toEqual(mockFeed.orders);
    expect(state.total).toEqual(mockFeed.total);
    expect(state.totalToday).toEqual(mockFeed.totalToday);
  });

  it('should handle getFeeds.rejected action', () => {
    const action = {
      type: getFeeds.rejected.type
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.loadingFeed).toBe(false);
  });
});

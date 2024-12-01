import {
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice
} from '../services';

const mockUser = {
  email: 'saashaaa@yandex.ru',
  name: 'Aleksandra'
};

describe('userSlice test', () => {
  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setUser action', () => {
    const action = {
      type: userSlice.actions.setUser.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  it('should handle setIsAuthChecked action', () => {
    const action = {
      type: userSlice.actions.setIsAuthChecked.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toEqual(mockUser);
  });

  it('should handle registerUser.pending action', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle registerUser.fulfilled action', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle registerUser.rejected action', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('should handle loginUser.pending action', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled action', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle loginUser.rejected action', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка авторизации');
  });

  it('should handle updateUser.pending action', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle updateUser.fulfilled action', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should handle updateUser.rejected action', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка обновления данных пользователя' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка обновления данных пользователя');
  });

  it('should handle logoutUser.pending action', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle logoutUser.fulfilled action', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const prevState = { ...initialState, mockUser };
    const state = userSlice.reducer(prevState, action);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it('should handle logoutUser.rejected action', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Ошибка выхода' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка выхода');
  });
});

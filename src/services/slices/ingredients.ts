import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/getIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

type TIngredientsState = {
  ingredients: TIngredient[] | [];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>): void => {
      state.ingredients = action.payload;
    },
    setIngredientsIsLoading: (state, action: PayloadAction<boolean>): void => {
      state.isLoading = action.payload;
    }
  },
  selectors: {
    selectIngredients: (state: TIngredientsState) => state.ingredients,
    selectIngredientsIsLoading: (state: TIngredientsState) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { setIngredients, setIngredientsIsLoading } =
  ingredientsSlice.actions;

export const { selectIngredients, selectIngredientsIsLoading } =
  ingredientsSlice.selectors;

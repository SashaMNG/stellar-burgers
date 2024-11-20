import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorBurgerState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorBurgerState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addConstructorBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => ({
        ...state,
        bun: action.payload
      }),
      prepare: (bun: TIngredient) => ({ payload: { ...bun, id: nanoid() } })
    },
    addConstructorIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => ({
        ...state,
        ingredients: state.ingredients
          ? [...state.ingredients, action.payload]
          : [action.payload]
      }),
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    deleteConstructorIngredients: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveConstructorIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;

      if (
        from < 0 ||
        from >= state.ingredients.length ||
        to < 0 ||
        to >= state.ingredients.length
      ) {
        return;
      }
      const [movedIngredient] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedIngredient);
    },
    resetConstructor: (state) => initialState
  },
  selectors: {
    getConstructorBun: (state: TConstructorBurgerState) => state.bun,
    getConstructorIngredients: (state: TConstructorBurgerState) =>
      state.ingredients
  }
});

export const {
  addConstructorBun,
  addConstructorIngredient,
  deleteConstructorIngredients,
  moveConstructorIngredient,
  resetConstructor
} = constructorSlice.actions;
export const { getConstructorBun, getConstructorIngredients } =
  constructorSlice.selectors;

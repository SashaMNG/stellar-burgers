import {
  addConstructorBun,
  addConstructorIngredient,
  constructorSlice,
  deleteConstructorIngredients,
  initialState,
  moveConstructorIngredient,
  resetConstructor
} from '../services/slices/constructor';

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'bun-1'
};

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'ingredient-1'
};

const initialStateWithIngredients = {
  bun: null,
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: 'ingredient-1'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
      id: 'ingredient-2'
    }
  ]
};

describe('constructorSlice', () => {
  it('should return the initial state', () => {
    expect(constructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should return addConstructorBun action', () => {
    const action = addConstructorBun(mockBun);
    const state = constructorSlice.reducer(initialState, action);
    expect(state.bun).toEqual({ ...mockBun, id: expect.any(String) });
  });

  it('should return addConstructorIngredient action', () => {
    const action = addConstructorIngredient(mockIngredient);
    const state = constructorSlice.reducer(initialState, action);

    expect(state.ingredients).toEqual([
      { ...mockIngredient, id: expect.any(String) }
    ]);
  });

  it('should delete the ingredient from the state', () => {
    const action = deleteConstructorIngredients('ingredient-1'); // ID биокотлеты
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual([
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        id: 'ingredient-2'
      }
    ]);
  });

  it('should not change the state if the ingredient does not exist', () => {
    const action = deleteConstructorIngredients('non-existent-id'); // Не существующий ID
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual(initialStateWithIngredients.ingredients); // Состояние должно остаться прежним
  });

  it('should move the ingredient to the new index', () => {
    const action = moveConstructorIngredient({ from: 0, to: 1 }); // Перемещаем биокотлету из индекса 0 в индекс 1
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual([
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        id: 'ingredient-2'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: 'ingredient-1'
      }
    ]);
  });

  it('should not change the state if indices are out of bounds', () => {
    const action = moveConstructorIngredient({ from: 0, to: 2 }); // Индекс 2 вне границ массива
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual(initialStateWithIngredients.ingredients); // Состояние должно остаться прежним
  });

  it('should not change the state if fromIndex equals toIndex', () => {
    const action = moveConstructorIngredient({ from: 0, to: 0 }); // Перемещение на тот же индекс
    const state = constructorSlice.reducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual(initialStateWithIngredients.ingredients); // Состояние должно остаться прежним
  });

  it('should return resetConstructor action', () => {
    const action = resetConstructor();
    const state = constructorSlice.reducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});

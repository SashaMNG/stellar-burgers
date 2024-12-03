import { BurgerIngredientUI } from '@ui';
import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  addConstructorBun,
  addConstructorIngredient
} from '../../services/slices/constructor';
import { useDispatch } from '../../services/store';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addConstructorBun(ingredient));
      } else {
        dispatch(addConstructorIngredient(ingredient));
      }
    };
    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

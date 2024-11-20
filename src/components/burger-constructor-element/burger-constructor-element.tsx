import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import {
  deleteConstructorIngredients,
  moveConstructorIngredient
} from '../../services/slices/constructor';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      dispatch(moveConstructorIngredient({ from: index, to: index - 1 }));
    };

    const handleMoveDown = () => {
      dispatch(moveConstructorIngredient({ from: index, to: index + 1 }));
    };

    const handleClose = () => {
      dispatch(deleteConstructorIngredients(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);

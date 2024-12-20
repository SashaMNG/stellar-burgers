import { BurgerConstructorUI } from '@ui';
import { TIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import {
  getConstructorBun,
  getConstructorIngredients,
  resetConstructor
} from '../../services/slices/constructor';
import {
  clearOrder,
  getOrderModalData,
  getOrderRequest,
  orderBurger
} from '../../services/slices/order';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const bun = useSelector(getConstructorBun);
  const ingredients = useSelector(getConstructorIngredients);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients || []
  };

  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const orderData = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(orderBurger(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

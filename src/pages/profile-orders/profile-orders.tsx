import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { getOrderIsLoading } from '../../services/slices/order';
import { getOrders, getOrdersSelector } from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(getOrdersSelector);
  const ordersLoading = useSelector(getOrderIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders?.length) dispatch(getOrders());
  }, []);

  if (ordersLoading) {
    return <Preloader />;
  } else {
    return <ProfileOrdersUI orders={orders} />;
  }
};

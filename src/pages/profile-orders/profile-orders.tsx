import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';

import { getOrdersFeedSelector } from '../../services/slices/feed';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(getOrdersFeedSelector);
  // const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};

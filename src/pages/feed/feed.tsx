import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getLoadingFeed,
  getOrders,
  getOrdersData,
  getOrdersFeedSelector
} from '../../services/slices/feed';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(getOrdersFeedSelector);
  const ordersLoading = useSelector(getLoadingFeed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersData());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getOrders());
  };

  if (ordersLoading) {
    return <Preloader />;
  } else {
    return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
  }
};

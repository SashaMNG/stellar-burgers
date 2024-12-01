import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeed, getFeeds, getLoadingFeed } from '../../services/slices/feed';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(getFeed);
  const ordersLoading = useSelector(getLoadingFeed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (ordersLoading) {
    return <Preloader />;
  } else {
    return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
  }
};

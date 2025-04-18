import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, feedsListSelector } from '@slices';

export const Feed: FC = () => {
  const orders = useSelector(feedsListSelector);

  const dispatch = useDispatch();

  const handleGetFeeds = () => dispatch(fetchFeeds());

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

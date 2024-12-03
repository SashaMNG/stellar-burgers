import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { getUser } from '../../services';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(getUser)?.name;

  return <AppHeaderUI userName={userName} />;
};

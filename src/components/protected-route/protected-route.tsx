import { Preloader } from '@ui';
import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/slices/user';
import { useSelector } from '../../services/store';

type TProtectedProps = {
  nonAuthUser?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  nonAuthUser = false,
  component
}: TProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!nonAuthUser && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (nonAuthUser && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const AuthUser = Protected;
export const NonAuthUser = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected nonAuthUser component={component} />;

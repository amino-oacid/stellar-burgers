import { FC, useEffect } from 'react';
import { TProtectedRouteProps } from './type';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyNotAuth,
  children
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (onlyNotAuth && getCookie('accessToken')) navigate('/');
    if (!onlyNotAuth && !getCookie('accessToken')) navigate('/login');
  }, []);

  return children;
};

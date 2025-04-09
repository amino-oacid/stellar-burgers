import { FC, useEffect } from 'react';
import { TProtectedRouteProps } from './type';
import { getCookie } from '../../utils/cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthSelector } from '@slices';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyNotAuth,
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    if (onlyNotAuth && isAuth) navigate('/');
    if (!onlyNotAuth && !isAuth) {
      navigate('/login', {
        state: { from: location }
      });
    }
  }, []);

  return children;
};

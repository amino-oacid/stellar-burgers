import { FC } from 'react';
import { TProtectedRouteProps } from './type';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyNotAuth,
  children
}) => children;

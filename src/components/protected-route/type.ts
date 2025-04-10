import { ReactElement } from 'react';

export type TProtectedRouteProps = {
  onlyNotAuth?: boolean;
  children: ReactElement;
}
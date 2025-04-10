import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorSelector,
  clearBurgerConstructor,
  clearOrderModalData,
  isAuthSelector,
  makeOrderRequest,
  orderModalDataSelector,
  orderRequestSelector
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(burgerConstructorSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelector);

  const orderRequest = useSelector(orderRequestSelector);

  const orderModalData = useSelector(orderModalDataSelector);

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const ingredients: TIngredient[] = [
      ...constructorItems.ingredients,
      constructorItems.bun
    ];
    const ids: string[] = ingredients.map((item: TIngredient) => item._id);
    dispatch(makeOrderRequest(ids)).then(() =>
      dispatch(clearBurgerConstructor())
    );
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients
        .map((item) => item.price)
        .reduce((s: number, v: number) => s + v, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData && orderModalData.order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  bunsSelector,
  chooseIngredientDetails,
  fetchIngredients,
  ingredientDetailsSelector
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(ingredientDetailsSelector);
  const buns = useSelector(bunsSelector);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (buns.length == 0) {
      dispatch(fetchIngredients()).then(() =>
        dispatch(chooseIngredientDetails(params.id || ''))
      );
    }
    dispatch(chooseIngredientDetails(params.id || ''));
  }, [params]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

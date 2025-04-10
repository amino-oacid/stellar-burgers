import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { TIngredient } from '@utils-types';

type InitialStateType = {
  buns: Array<TIngredient>;
  mains: Array<TIngredient>;
  sauces: Array<TIngredient>;
  ingredientDetails: TIngredient | null;
};

const initialState: InitialStateType = {
  buns: [],
  mains: [],
  sauces: [],
  ingredientDetails: null
};

export const fetchIngredients = createAsyncThunk(
  'burgerIngredients/fetchIngredients',
  async (_, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await getIngredientsApi();
    dispatch(saveIngredients(response));
    return response;
  }
);

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    saveIngredients(state, action: PayloadAction<Array<TIngredient>>) {
      state.buns = action.payload.filter(
        (item: TIngredient) => item.type === 'bun'
      );
      state.mains = action.payload.filter(
        (item: TIngredient) => item.type === 'main'
      );
      state.sauces = action.payload.filter(
        (item: TIngredient) => item.type === 'sauce'
      );
    },
    chooseIngredientDetails(state, action: PayloadAction<string>) {
      const ingredients = state.buns.concat(state.mains, state.sauces);
      const ingredientData = ingredients.find(
        (item) => item._id === action.payload
      );
      if (ingredientData) {
        state.ingredientDetails = ingredientData;
      }
    }
  },
  selectors: {
    bunsSelector: (state) => state.buns,
    mainsSelector: (state) => state.mains,
    saucesSelector: (state) => state.sauces,
    ingredientsSelector: (state) =>
      state.buns.concat(state.mains, state.sauces),
    ingredientDetailsSelector: (state) => state.ingredientDetails
  }
});

export const { saveIngredients, chooseIngredientDetails } =
  burgerIngredientsSlice.actions;
export const {
  bunsSelector,
  mainsSelector,
  saucesSelector,
  ingredientsSelector,
  ingredientDetailsSelector
} = burgerIngredientsSlice.selectors;
export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;

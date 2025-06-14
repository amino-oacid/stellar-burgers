import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { TIngredient } from '@utils-types';

type InitialStateType = {
  buns: Array<TIngredient>;
  mains: Array<TIngredient>;
  sauces: Array<TIngredient>;
  ingredients: Array<TIngredient>;
  ingredientDetails: TIngredient | null;
  loading: boolean;
  error: string | null;
};

export const initialState: InitialStateType = {
  buns: [],
  mains: [],
  sauces: [],
  ingredients: [],
  ingredientDetails: null,
  loading: false,
  error: null
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
      state.ingredients = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
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

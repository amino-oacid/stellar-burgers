import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { TUser } from '@utils-types';
import { AppDispatch } from '../../store';

type InitialStateType = {
  user: TUser;
  isAuth: boolean;
};

const initialState: InitialStateType = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false
};

export const registrationRequest = createAsyncThunk(
  'user/registrationRequest',
  async (data: TRegisterData, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    dispatch(saveUser(response.user));
    return response;
  }
);

export const loginRequest = createAsyncThunk(
  'user/loginRequest',
  async (data: TLoginData, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    dispatch(saveUser(response.user));
    return response;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await getUserApi();
    dispatch(saveUser(response.user));
    return response;
  }
);

export const logoutRequest = createAsyncThunk(
  'user/logoutRequest',
  async (_, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await logoutApi();
    dispatch(clearUser());
    return response;
  }
);

export const updateUserRequest = createAsyncThunk(
  'user/updateUserRequest',
  async (data: Partial<TRegisterData>, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await updateUserApi(data);
    dispatch(saveUser(response.user));
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    clearUser(state) {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      state.user = {
        email: '',
        name: ''
      };
      state.isAuth = false;
    }
  },
  selectors: {
    userSelector: (state) => state.user,
    isAuthSelector: (state) => state.isAuth
  }
});

export const { saveUser, clearUser } = userSlice.actions;
export const { userSelector, isAuthSelector } = userSlice.selectors;
export const userReducer = userSlice.reducer;

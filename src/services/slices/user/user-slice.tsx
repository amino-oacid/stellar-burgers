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
  loading: boolean;
  error: string | null;
};

export const initialState: InitialStateType = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false,
  loading: false,
  error: null
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
  },
  extraReducers: (builder) => {
    builder.addCase(registrationRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
    });
    builder.addCase(registrationRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
      state.isAuth = false;
    });
    builder.addCase(registrationRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.isAuth = true;
    });

    builder.addCase(loginRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
      state.isAuth = false;
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.isAuth = true;
    });

    builder.addCase(checkUserAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
    });
    builder.addCase(checkUserAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
      state.isAuth = false;
    });
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuth = true;
      state.user = action.payload.user;
    });

    builder.addCase(updateUserRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(updateUserRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
    });

    builder.addCase(logoutRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = true;
    });
    builder.addCase(logoutRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
      state.isAuth = false;
    });
    builder.addCase(logoutRequest.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.user = {
        email: '',
        name: ''
      };
      state.isAuth = false;
    });
  }
});

export const { saveUser, clearUser } = userSlice.actions;
export const { userSelector, isAuthSelector } = userSlice.selectors;
export const userReducer = userSlice.reducer;

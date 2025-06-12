import { TLoginData, TRegisterData } from '@api';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  initialState,
  loginRequest,
  logoutRequest,
  registrationRequest,
  updateUserRequest,
  userReducer
} from './user-slice';

const mockUser: TUser = {
  email: 'test@mail.ru',
  name: 'test'
};

const mockRegisterData: TRegisterData = {
  email: 'test@mail.ru',
  password: '123',
  name: 'test'
};

const mockLoginData: TLoginData = {
  email: 'test@mail.ru',
  password: '123'
};

const mockRegisterResponse = {
  success: true,
  user: mockUser,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

const mockLoginResponse = {
  success: true,
  user: mockUser,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

const mockLogoutResponse = {
  name: '',
  email: ''
};

const mockUserResponse = {
  success: true,
  user: mockUser
};

const mockUpdatedUser = {
  success: true,
  user: {
    name: 'updated test',
    email: 'updated@mail.ru'
  }
};

describe('Проверка асинхронных экшенов слайса пользователя', () => {
  it('Проверка регистрации пользователя (pending, fulfilled, rejected)', () => {
    let state = userReducer(
      initialState,
      registrationRequest.pending('requestId', mockRegisterData)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(false);

    state = userReducer(
      state,
      registrationRequest.fulfilled(
        mockRegisterResponse,
        'requestId',
        mockRegisterData
      )
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUser);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);

    state = userReducer(
      state,
      registrationRequest.rejected(
        new Error('error'),
        'requestId',
        mockRegisterData
      )
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
    expect(state.isAuth).toBe(false);
  });

  it('Проверка логина пользователя (pending, fulfilled, rejected)', () => {
    let state = userReducer(
      initialState,
      loginRequest.pending('requestId', mockLoginData)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(false);

    state = userReducer(
      state,
      loginRequest.fulfilled(mockLoginResponse, 'requestId', mockLoginData)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);

    state = userReducer(
      state,
      loginRequest.rejected(new Error('error'), 'requestId', mockLoginData)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
    expect(state.isAuth).toBe(false);
  });

  it('Проверка получения пользователя (pending, fulfilled, rejected)', () => {
    let state = userReducer(initialState, checkUserAuth.pending('requestId'));
    expect(state.isAuth).toBe(false);

    state = userReducer(
      state,
      checkUserAuth.fulfilled(mockUserResponse, 'requestId')
    );
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);

    state = userReducer(
      state,
      checkUserAuth.rejected(new Error('error'), 'requestId')
    );
    expect(state.isAuth).toBe(false);
  });

  it('Проверка обновления пользователя (pending, fulfilled, rejected)', () => {
    let state = userReducer(
      initialState,
      updateUserRequest.pending('requestId', mockUpdatedUser.user)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);

    state = userReducer(
      state,
      updateUserRequest.fulfilled(mockUpdatedUser, 'requestId', mockUser)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUpdatedUser.user);

    state = userReducer(
      state,
      updateUserRequest.rejected(new Error('error'), 'requestId', {})
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
  });

  it('Проверка логаута пользователя (pending, fulfilled, rejected)', () => {
    let state = userReducer(initialState, logoutRequest.pending('requestId'));
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);

    state = userReducer(
      state,
      logoutRequest.fulfilled({ success: true }, 'requestId')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockLogoutResponse);
    expect(state.isAuth).toBe(false);

    state = userReducer(
      state,
      logoutRequest.rejected(new Error('error'), 'requestId')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
    expect(state.isAuth).toBe(false);
  });
});

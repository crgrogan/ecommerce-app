import { createReducer, on } from '@ngrx/store';
import { User } from 'src/models/user.model';
import {
  registerUser,
  userRegisterSuccess,
  userRegisterFailed,
  loginUser,
  userLoginSuccess,
  userLoginFailed,
  registerPageUnloaded,
  loginPageUnloaded,
  logoutUser,
} from '../actions/user.actions';

export interface UserState {
  userInfo: User;
  isLoading: boolean;
  err?: string;
}

const initialUserState: UserState = {
  userInfo: null,
  isLoading: false,
};

export const registerReducer = createReducer(
  initialUserState,
  on(registerUser, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(userRegisterSuccess, (state, { user }) => {
    const newState = { ...state, userInfo: user, isLoading: false };
    return newState;
  }),
  on(userRegisterFailed, (state, { error }) => {
    return { ...state, userInfo: null, isLoading: false, err: error };
  }),
  on(registerPageUnloaded, (state) => {
    return { ...state, err: null };
  })
);

export const loginReducer = createReducer(
  initialUserState,
  on(loginUser, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(userLoginSuccess, (state, { user }) => {
    const newState = { ...state, userInfo: user, isLoading: false };
    return newState;
  }),
  on(userLoginFailed, (state, { error }) => {
    return { ...state, userInfo: null, isLoading: false, err: error };
  }),
  on(loginPageUnloaded, (state) => {
    return { ...state, err: null };
  }),
  on(logoutUser, (state) => {
    return { ...state, userInfo: null, isLoading: false, err: null };
  })
);

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
  updateUserDetails,
  updateUserDetailsSuccess,
  updateUserDetailsFailed,
  clearUpdateUser,
  getUsers,
  usersLoadedSuccess,
  usersLoadedFailed,
  deleteUser,
  UserDeleteSuccess,
  UserDeleteFailed,
} from '../actions/user.actions';

// current User
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

// updated user details
export interface UpdatedUserState {
  msg: string;
  isLoading: boolean;
  field: string;
  err: string;
}

const initialUpdatedUserState: UpdatedUserState = {
  msg: null,
  isLoading: false,
  field: null,
  err: null,
};

export const updatedUserReducer = createReducer(
  initialUpdatedUserState,
  on(updateUserDetails, (state) => {
    return { ...state, isLoading: true, err: null, msg: null };
  }),
  on(updateUserDetailsSuccess, (state, { updatedUser }) => {
    const newState = {
      ...state,
      msg: updatedUser.msg,
      isLoading: false,
      field: updatedUser.field,
    };
    return newState;
  }),
  on(updateUserDetailsFailed, (state, { error, field }) => {
    return {
      ...state,
      isLoading: false,
      err: error,
      field: field,
    };
  }),
  on(clearUpdateUser, (state) => {
    return initialUpdatedUserState;
  })
);

// users list
export interface UsersState {
  usersList: User[];
  isLoading: boolean;
  err: string;
}

const initialUsersListState: UsersState = {
  usersList: [],
  isLoading: false,
  err: null,
};

export const usersListReducer = createReducer(
  initialUsersListState,
  on(getUsers, (state) => {
    return { ...state, isLoading: true, err: null };
  }),
  on(usersLoadedSuccess, (state, { users }) => {
    return {
      ...state,
      usersList: users,
      isLoading: false,
    };
  }),
  on(usersLoadedFailed, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      err: error,
      usersList: [],
    };
  })
);

// deleteUser
export interface DeleteUserState {
  success: boolean;
  isLoading: boolean;
  err: string;
}

const initialDeleteUserState: DeleteUserState = {
  success: false,
  isLoading: false,
  err: null,
};

export const deleteUserReducer = createReducer(
  initialDeleteUserState,
  on(deleteUser, (state) => {
    return { ...state, isLoading: true, success: false };
  }),
  on(UserDeleteSuccess, (state, { user }) => {
    return {
      ...state,
      isLoading: false,
      success: true,
    };
  }),
  on(UserDeleteFailed, (state, { error }) => {
    return { ...state, isLoading: false, err: error };
  })
);

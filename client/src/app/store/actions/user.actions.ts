import { createAction, props } from '@ngrx/store';

// get all users
export const getUsers = createAction('[USER] Get All Users');

export const usersLoadedSuccess = createAction(
  '[USER] Users Loaded Success',
  props<{ users }>()
);

export const usersLoadedFailed = createAction(
  '[USER] Users Loaded Failed',
  props<{ error }>()
);

// register users
export const registerUser = createAction(
  '[USER] Register User',
  (name, email, password) => ({
    name,
    email,
    password,
  })
);

export const userRegisterSuccess = createAction(
  '[USER] User Register Success',
  props<{ user }>()
);

export const userRegisterFailed = createAction(
  '[USER] User Register Failed',
  props<{ error }>()
);

// login users
export const loginUser = createAction(
  '[USER] Login User',
  (email, password, redirectUrl) => ({
    payload: {
      email,
      password,
    },
    redirectUrl,
  })
);

export const userLoginSuccess = createAction(
  '[USER] User Login Success',
  props<{ user }>()
);

export const userLoginFailed = createAction(
  '[USER] User Login Failed',
  props<{ error }>()
);

// logout user

export const logoutUser = createAction('[USER] User Logout');

// set error state in register reducer back to null
export const registerPageUnloaded = createAction(
  '[USER] Register Page Unloaded'
);

// set error state in login reducer back to null
export const loginPageUnloaded = createAction('[USER] Login Page Unloaded');

// updated user's details
export const updateUserDetails = createAction(
  '[USER] Update User Details',
  (name, email, password) => ({
    name,
    email,
    password,
  })
);

export const updateUserDetailsSuccess = createAction(
  '[USER] Update User Details Success',
  props<{ updatedUser }>()
);

export const updateUserDetailsFailed = createAction(
  '[USER] Update User Details Failed',
  props<{ error; field }>()
);

// set state in update user reducer back to initial state
export const clearUpdateUser = createAction('[USER] Clear Update User');

// delete user
export const deleteUser = createAction('[USER] Delete User', (id: string) => ({
  id,
}));

export const UserDeleteSuccess = createAction(
  '[USER] User Delete Success',
  props<{ user }>()
);

export const UserDeleteFailed = createAction(
  '[USER] User Delete Failed',
  props<{ error: string }>()
);

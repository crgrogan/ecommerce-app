import { createAction, props } from '@ngrx/store';

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

export const loginUser = createAction(
  '[USER] Login User',
  (email, password) => ({
    email,
    password,
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

// set error state in register reducer back to null
export const registerPageUnloaded = createAction(
  '[USER] Register Page Unloaded'
);

// set error state in login reducer back to null
export const loginPageUnloaded = createAction('[USER] Login Page Unloaded');

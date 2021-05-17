import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import {
  UpdatedUserState,
  UsersState,
  UserState,
} from '../reducers/user.reducer';

export const selectCurrentUser = (state: AppState) => state.currentUser;

export const selectCurrentUserInfo = createSelector(
  selectCurrentUser,
  (state: UserState) => state.userInfo
);

export const selectCurrentUserLoading = createSelector(
  selectCurrentUser,
  (state: UserState) => state.isLoading
);

export const selectCurrentUserError = createSelector(
  selectCurrentUser,
  (state: UserState) => state.err
);

// new user created
export const selectNewUser = (state: AppState) => state.newUser;

export const selectNewUserError = createSelector(
  selectNewUser,
  (state: UserState) => state.err
);

export const selectNewUserLoading = createSelector(
  selectNewUser,
  (state: UserState) => state.isLoading
);

// update user details
export const selectUpdateUser = (state: AppState) => state.updatedUser;

export const selectUpdateUserError = createSelector(
  selectUpdateUser,
  (state: UpdatedUserState) => state.err
);

export const selectUpdateUserLoading = createSelector(
  selectUpdateUser,
  (state: UpdatedUserState) => state.isLoading
);

export const selectUpdateUserSuccess = createSelector(
  selectUpdateUser,
  (state: UpdatedUserState) => state.msg
);

export const selectUpdateUserField = createSelector(
  selectUpdateUser,
  (state: UpdatedUserState) => state.field
);

// get all users

export const selectUsers = (state: AppState) => state.users;

export const selectUsersList = createSelector(
  selectUsers,
  (state: UsersState) => state.usersList
);

export const selectUsersListLoading = createSelector(
  selectUsers,
  (state: UsersState) => state.isLoading
);

export const selectUsersListFailed = createSelector(
  selectUsers,
  (state: UsersState) => state.err
);

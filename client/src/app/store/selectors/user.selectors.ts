import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserState } from '../reducers/user.reducer';

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

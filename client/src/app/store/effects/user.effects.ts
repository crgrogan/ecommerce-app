import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import {
  registerUser,
  userRegisterFailed,
  userRegisterSuccess,
  loginUser,
  userLoginFailed,
  userLoginSuccess,
  logoutUser,
  updateUserDetails,
  updateUserDetailsSuccess,
  updateUserDetailsFailed,
  getUsers,
  usersLoadedSuccess,
  usersLoadedFailed,
  deleteUser,
  UserDeleteSuccess,
  UserDeleteFailed,
} from '../actions/user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(() =>
        this.userService.getAll().pipe(
          map((data) => usersLoadedSuccess({ users: data })),
          catchError((err) => of(usersLoadedFailed({ error: err.error.msg })))
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap((action) =>
        this.userService.register(action).pipe(
          switchMap((data) => {
            this.router.navigate(['/']);
            return [
              userRegisterSuccess({ user: data }),
              userLoginSuccess({ user: data }),
            ];
          }),
          catchError((err) => of(userRegisterFailed({ error: err.error.msg })))
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) =>
        this.userService.login(action).pipe(
          map((data) => {
            this.router.navigate(['/']);
            return userLoginSuccess({ user: data });
          }),
          catchError((err) => of(userLoginFailed({ error: err.error.msg })))
        )
      )
    )
  );

  logoutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutUser),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // update user's details
  updateUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserDetails),
      switchMap((action) =>
        this.userService.update(action).pipe(
          switchMap((data: { user; field: string }) => {
            return [
              updateUserDetailsSuccess({ updatedUser: data }),
              userLoginSuccess({ user: data.user }),
            ];
          }),
          catchError((err) =>
            of(
              updateUserDetailsFailed({
                error: err.error.msg,
                field: err.error.field,
              })
            )
          )
        )
      )
    )
  );

  // delete user from database
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.userService.delete(action.id).pipe(
          switchMap((data) => {
            // if user is successfully deleted, dispatch getUsers to get updated users list
            return [UserDeleteSuccess({ user: data }), getUsers()];
          }),
          catchError((err) => of(UserDeleteFailed({ error: err.error.msg })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}

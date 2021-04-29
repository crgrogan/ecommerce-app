import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import {
  registerUser,
  userRegisterFailed,
  userRegisterSuccess,
  loginUser,
  userLoginFailed,
  userLoginSuccess,
} from '../actions/user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
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

  LoginUser$ = createEffect(() =>
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

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}

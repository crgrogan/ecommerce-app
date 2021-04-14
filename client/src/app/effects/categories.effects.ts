import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  getCategories,
  categoriesLoadedSuccess,
  categoriesLoadedFailed,
} from '../actions/categories.actions';
import { CategoriesService } from '../components/home/categories.service';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories),
      mergeMap(() =>
        this.categoriesService.getAll().pipe(
          map((data) => categoriesLoadedSuccess({ categories: data })),
          catchError((err) =>
            of(categoriesLoadedFailed({ error: err.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
}

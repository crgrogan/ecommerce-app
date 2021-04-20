import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  getFilters,
  filtersLoadedSuccess,
  filtersLoadedFailed,
} from '../actions/filters.actions';
import { FiltersService } from '../components/home/filters.service';

// categoriesLoadedSuccess({ categories: data })

@Injectable()
export class FiltersEffects {
  loadFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilters),
      mergeMap(() =>
        this.filtersService.getAll().pipe(
          map((data) => filtersLoadedSuccess({ filters: data[0] })),
          catchError((err) => of(filtersLoadedFailed({ error: err.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private filtersService: FiltersService
  ) {}
}

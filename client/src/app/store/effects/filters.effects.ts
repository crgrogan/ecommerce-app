import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import {
  getFilters,
  filtersLoadedSuccess,
  filtersLoadedFailed,
  updateFilters,
  filtersUpdatedSuccess,
  filtersUpdatedFailed,
  deleteFilter,
  filterDeleteFailed,
  filterDeleteSuccess,
} from '../actions/filters.actions';
import { FiltersService } from '../services/filters.service';

// categoriesLoadedSuccess({ categories: data })

@Injectable()
export class FiltersEffects {
  loadFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilters),
      mergeMap(() =>
        this.filtersService.getAll().pipe(
          map((data) => filtersLoadedSuccess({ filters: data[0] })),
          catchError((err) => of(filtersLoadedFailed({ error: err.error.msg })))
        )
      )
    )
  );

  updateFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFilters),
      mergeMap((action) =>
        this.filtersService.update(action.filters).pipe(
          switchMap((data) => {
            // if filters are successfully updated, dispatch getFilters to get updated filter list
            return [filtersUpdatedSuccess({ filters: data }), getFilters()];
          }),
          catchError((err) =>
            of(filtersUpdatedFailed({ error: err.error.msg }))
          )
        )
      )
    )
  );

  // delete filter from database
  deleteFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFilter),
      switchMap((action) =>
        this.filtersService.delete(action.id, action.category).pipe(
          switchMap((data) => {
            // if filter is successfully deleted, dispatch getFilters to get updated filter list
            return [filterDeleteSuccess({ filter: data }), getFilters()];
          }),
          catchError((err) => of(filterDeleteFailed({ error: err.error.msg })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private filtersService: FiltersService
  ) {}
}

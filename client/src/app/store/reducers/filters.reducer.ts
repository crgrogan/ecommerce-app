import { createReducer, on } from '@ngrx/store';
import {
  getFilters,
  filtersLoadedSuccess,
  filtersLoadedFailed,
} from '../actions/filters.actions';
import { Category } from 'src/models/category.model';
import { state } from '@angular/animations';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface FiltersState {
  categoriesList: Category[];
  brandsList: string[];
  coloursList: string[];
  isLoading: boolean;
  err?: string;
}

const initialState: FiltersState = {
  categoriesList: [],
  brandsList: [],
  coloursList: [],
  isLoading: false,
};

export const filtersReducer = createReducer(
  initialState,
  on(getFilters, (state) => {
    return { ...state, isLoading: true };
  }),
  on(filtersLoadedSuccess, (state, { filters }) => {
    const newState = {
      ...state,
      categoriesList: filters.categories,
      brandsList: filters.brands,
      coloursList: filters.colours,
      isLoading: false,
    };
    return newState;
  }),
  on(filtersLoadedFailed, (state, { error }) => {
    return {
      ...state,
      categoriesList: [],
      brandsList: [],
      coloursList: [],
      isLoading: false,
      err: error,
    };
  })
);
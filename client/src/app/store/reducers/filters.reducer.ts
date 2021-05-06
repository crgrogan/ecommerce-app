import { createReducer, on } from '@ngrx/store';
import {
  getFilters,
  filtersLoadedSuccess,
  filtersLoadedFailed,
  updateFilters,
  filtersUpdatedSuccess,
  filtersUpdatedFailed,
  filterDeleteSuccess,
  filterDeleteFailed,
  deleteFilter,
  resetFiltersUpdateState,
} from '../actions/filters.actions';
import { Category } from 'src/models/category.model';

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

// add new filters

export interface UpdateFiltersState {
  filtersList: [];
  msg: string;
  isLoading: boolean;
  err?: string;
}

const initialUpdateFiltersState: UpdateFiltersState = {
  filtersList: [],
  msg: null,
  isLoading: false,
};

export const updateFiltersReducer = createReducer(
  initialUpdateFiltersState,
  on(updateFilters, (state) => {
    return { ...state, isLoading: true, err: null, msg: null };
  }),
  on(filtersUpdatedSuccess, (state, { filters }) => {
    const newState = {
      ...state,
      filtersList: filters.data,
      msg: filters.msg,
      isLoading: false,
    };
    return newState;
  }),
  on(resetFiltersUpdateState, (state) => {
    return initialUpdateFiltersState;
  }),
  on(filtersUpdatedFailed, (state, { error }) => {
    return {
      ...state,
      filtersList: [],
      isLoading: false,
      err: error,
      msg: null,
    };
  })
);

// delete product

export interface DeleteFilterState {
  success: boolean;
  isLoading: boolean;
  err: string;
}

const initialDeleteFilterState: DeleteFilterState = {
  success: false,
  isLoading: false,
  err: null,
};

export const deleteFilterReducer = createReducer(
  initialDeleteFilterState,
  on(deleteFilter, (state) => {
    return { ...state, isLoading: true, success: false };
  }),
  on(filterDeleteSuccess, (state, { filter }) => {
    return {
      ...state,
      isLoading: false,
      success: true,
    };
  }),
  on(filterDeleteFailed, (state, { error }) => {
    return { ...state, isLoading: false, err: error };
  })
);

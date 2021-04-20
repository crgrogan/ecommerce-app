import { createSelector } from '@ngrx/store';
import { Category } from 'src/models/category.model';
import { AppState } from '../app.state';

export const selectFilters = (state: AppState) => state.filters;

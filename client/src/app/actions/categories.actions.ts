import { Injectable } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/models/category.model';

// get all categories
export const getCategories = createAction('[CATEGORY] Get Categories');

export const categoriesLoadedSuccess = createAction(
  '[CATEGORY] Categories Loaded Success',
  props<{ categories }>()
);

export const categoriesLoadedFailed = createAction(
  '[CATEGORY] Categories Loaded Failed',
  props<{ error: String }>()
);

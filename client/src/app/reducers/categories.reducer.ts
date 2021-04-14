import { createReducer, on } from '@ngrx/store';
import {
  getCategories,
  categoriesLoadedSuccess,
  categoriesLoadedFailed,
} from '../actions/categories.actions';
import { Category } from 'src/models/category.model';
import { state } from '@angular/animations';
import { Action } from 'rxjs/internal/scheduler/Action';

const initialState: {
  categoriesList: Category[];
  isLoading: Boolean;
  err?: String;
} = {
  categoriesList: [
    /* {
      name: 'T-Shirts/Shirts',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-t-shirt-with-bloom-of-youth-multicoloured-text-print-in-acid-wash/20831307-3?$XXL$&wid=513&fit=constrain&hei=236&wid=185&bgc=000000',
    },
    {
      name: 'Shoes',
      image:
        'https://images.asos-media.com/products/asos-design-oversized-t-shirt-with-bloom-of-youth-multicoloured-text-print-in-acid-wash/20831307-3?$XXL$&wid=513&fit=constrain&hei=236&wid=185&bgc=000000',
    }, */
  ],
  isLoading: false,
};

export const categoriesReducer = createReducer(
  initialState,
  on(getCategories, (state) => {
    return { ...state, isLoading: true };
  }),
  on(categoriesLoadedSuccess, (state, { categories }) => {
    const newState = { ...state, categoriesList: categories, isLoading: false };
    return newState;
  }),
  on(categoriesLoadedFailed, (state, { error }) => {
    return { ...state, categoriesList: [], isLoading: false, err: error };
  })
);

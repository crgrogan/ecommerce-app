import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import {
  getProducts,
  productsLoadedFailed,
  productsLoadedSuccess,
  getProduct,
  productLoadedFailed,
  productLoadedSuccess,
} from '../actions/products.actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsEffects {
  // get all products
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap((action) =>
        this.productsService.getAll(action.queryString).pipe(
          map((data) => productsLoadedSuccess({ products: data })),
          catchError((err) =>
            of(productsLoadedFailed({ error: err.error.msg }))
          )
        )
      )
    )
  );

  // get specific product by id
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProduct),
      switchMap((action) =>
        this.productsService.getSelected(action.id).pipe(
          map((data) => productLoadedSuccess({ product: data })),
          catchError((err) => of(productLoadedFailed({ error: err.error.msg })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}

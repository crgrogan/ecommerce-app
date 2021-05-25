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
  saveProduct,
  productSaveSuccess,
  productSaveFailed,
  deleteProduct,
  productDeleteFailed,
  productDeleteSuccess,
} from '../actions/products.actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsEffects {
  // get all products
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap((action) =>
        this.productsService.getAll(action.queryString, action.admin).pipe(
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

  // create/update product
  saveProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveProduct),
      switchMap((action) =>
        this.productsService.createProduct(action.payload).pipe(
          switchMap((data) => {
            // if product is successfully created/updated, dispatch getProducts to get updated product list
            return [
              productSaveSuccess({ product: data }),
              getProducts('', true),
            ];
          }),
          catchError((err) => of(productSaveFailed({ error: err.error.msg })))
        )
      )
    )
  );

  // delete product from database
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) =>
        this.productsService.deleteProduct(action.id).pipe(
          switchMap((data) => {
            // if product is successfully deleted, dispatch getProducts to get updated product list
            return [
              productDeleteSuccess({ product: data }),
              getProducts('', true),
            ];
          }),
          catchError((err) => of(productDeleteFailed({ error: err.error.msg })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}

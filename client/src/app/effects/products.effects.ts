import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  getProducts,
  productsLoadedFailed,
  productsLoadedSuccess,
} from '../actions/products.actions';
import { ProductsService } from '../components/product-list/products.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap(() =>
        this.productsService.getAll().pipe(
          map((data) => productsLoadedSuccess({ products: data })),
          catchError((err) => of(productsLoadedFailed({ error: err.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}

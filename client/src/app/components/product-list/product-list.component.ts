import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';
import { Category } from 'src/models/category.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProducts } from 'src/app/store/actions/products.actions';
import { getFilters } from 'src/app/store/actions/filters.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  brands$: Observable<String[]>;
  colours$: Observable<String[]>;

  constructor(
    private store: Store<{
      products: { productsList: Product[]; isLoading: Boolean };
      filters: {
        categoriesList: Category[];
        brandsList: String[];
        coloursList: String[];
        isLoading: Boolean;
      };
    }>
  ) {
    this.products$ = this.store.select((state) => state.products.productsList);
    this.categories$ = this.store.select(
      (state) => state.filters.categoriesList
    );
    this.brands$ = this.store.select((state) => state.filters.brandsList);
    this.colours$ = this.store.select((state) => state.filters.coloursList);
  }

  ngOnInit(): void {
    // get all products
    this.store.dispatch(getProducts());

    // get all filters
    this.store.dispatch(getFilters());
  }

  submitForm() {
    console.log('submit');
  }
}

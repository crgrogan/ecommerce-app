import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';
import { Category } from 'src/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProducts } from 'src/app/store/actions/products.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filter } from 'src/models/filter.model';
import { selectProductsList } from 'src/app/store/selectors/products.selectors';
import {
  selectBrandsList,
  selectCategoriesList,
  selectColoursList,
} from 'src/app/store/selectors/filters.selectors';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  brands$: Observable<String[]>;
  colours$: Observable<String[]>;
  filterObj: Filter = {};
  sortBySelected: string = '';
  brandSelected: string = 'hello';
  categorySelected: string = '';
  colourSelected: string = '';
  queryParamsSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.products$ = this.store.select(selectProductsList);
    this.categories$ = this.store.select(selectCategoriesList);
    this.brands$ = this.store.select(selectBrandsList);
    this.colours$ = this.store.select(selectColoursList);
  }

  ngOnInit(): void {
    // subscribe to url and watch for changes to query string
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.searchQuery = params.q;
        // this.params = params;
        // set initial value of filters based on query string
        this.setSelectedValues(params);
        // get products based on filters in query string
        this.store.dispatch(getProducts(this.objectToQueryString(params)));
      }
    );
  }

  setSelectedValues(filterValues: Params) {
    const {
      brand = '',
      category = '',
      colour = '',
      sortby = '',
    } = filterValues;
    // capitalize first letter of each word in string
    this.brandSelected = brand.replace(/\b\w/g, (char) => char.toUpperCase());
    this.colourSelected = colour.replace(/\b\w/g, (char) => char.toUpperCase());
    this.categorySelected = category.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    this.sortBySelected = sortby.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // convert object to query string
  objectToQueryString(obj: Filter) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  submitForm(formValues) {
    const params = new URLSearchParams(window.location.search);
    // iterate through key/value pairs in formValues object
    for (let prop in formValues) {
      // remove property if value is falsey
      if (!formValues[prop]) {
        delete formValues[prop];
        // else convert value to lowercase
      } else {
        formValues[prop] = formValues[prop].toLowerCase();
      }
    }
    if (params.has('q')) {
      this.router.navigate(['/products/filter'], {
        queryParams: { q: params.get('q'), ...formValues },
      });
    } else {
      this.router.navigate(['/products/filter'], {
        queryParams: formValues,
      });
    }
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}

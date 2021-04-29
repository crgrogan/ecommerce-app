import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';
import { Category } from 'src/models/category.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProducts } from 'src/app/store/actions/products.actions';
import { Location, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filter } from 'src/models/filter.model';

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
  filterObj: Filter = {};
  sortBySelected: string = '';
  brandSelected: string = 'hello';
  categorySelected: string = '';
  colourSelected: string = '';

  constructor(
    private store: Store<{
      products: { productsList: Product[]; isLoading: boolean };
      filters: {
        categoriesList: Category[];
        brandsList: string[];
        coloursList: string[];
        isLoading: boolean;
      };
    }>,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.products$ = this.store.select((state) => state.products.productsList);
    this.categories$ = this.store.select(
      (state) => state.filters.categoriesList
    );
    this.brands$ = this.store.select((state) => state.filters.brandsList);
    this.colours$ = this.store.select((state) => state.filters.coloursList);
  }

  ngOnInit(): void {
    // check url for query string
    const params = this.route.snapshot.queryParams;

    // set initial value of filters based on query string
    this.setSelectedValues(params);

    // filter products based on filters provided
    this.filterResults(params);
  }

  setSelectedValues(params: Params) {
    const { brand = '', category = '', colour = '', sortby = '' } = params;

    this.brandSelected = brand.replace(/\b\w/g, (l) => l.toUpperCase());
    this.colourSelected = colour.replace(/\b\w/g, (l) => l.toUpperCase());
    this.categorySelected = category.replace(/\b\w/g, (l) => l.toUpperCase());
    this.sortBySelected = sortby.replace(/\b\w/g, (l) => l.toUpperCase());
  }

  filterResults(params: Params) {
    for (let property in params) {
      this.filterObj[property] = params[property];
    }
    this.store.dispatch(getProducts(this.objectToQueryString(this.filterObj)));
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

  submitForm(e) {
    const filter = e.target.value.toLowerCase();
    const name = e.target.name;
    const params = new URLSearchParams(window.location.search);
    // loop through current url search params and populate filterObj
    params.forEach((val, key) => {
      this.filterObj[key] = val;
    });
    // add the new filter that prompted the form submission
    this.filterObj[name] = filter;
    // update url using filterObj as the queryString
    this.location.go(
      '/products/filter',
      this.objectToQueryString(this.filterObj)
    );
    this.store.dispatch(getProducts(this.objectToQueryString(this.filterObj)));
  }
}

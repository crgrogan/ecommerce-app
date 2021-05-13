import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';
import { Category } from 'src/models/category.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProducts } from 'src/app/store/actions/products.actions';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
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
    private store: Store<AppState>,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.products$ = this.store.select(selectProductsList);
    this.categories$ = this.store.select(selectCategoriesList);
    this.brands$ = this.store.select(selectBrandsList);
    this.colours$ = this.store.select(selectColoursList);
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

    this.brandSelected = brand.replace(/\b\w/g, (char) => char.toUpperCase());
    this.colourSelected = colour.replace(/\b\w/g, (char) => char.toUpperCase());
    this.categorySelected = category.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    this.sortBySelected = sortby.replace(/\b\w/g, (char) => char.toUpperCase());
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from 'src/models/product.model';
import { getProduct } from 'src/app/store/actions/products.actions';
import {
  selectSelectedProduct,
  selectSelectedProductLoading,
} from 'src/app/store/selectors/products.selectors';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product$: Observable<Product>;
  productLoading$: Observable<boolean>;
  selectedValue: number = 1;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.product$ = this.store.select(selectSelectedProduct);
    this.productLoading$ = this.store.select(selectSelectedProductLoading);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // get individual product
    this.store.dispatch(getProduct(this.id));
  }

  createOptionsArray(countInStock: number) {
    console.log(countInStock);

    return new Array(countInStock);
  }

  onSelectedChange(value: number) {
    this.selectedValue = value;
  }
}

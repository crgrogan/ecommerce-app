import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from 'src/models/product.model';
import { getProduct } from 'src/app/store/actions/products.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product$: Observable<Product>;
  selectedValue: number = 1;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{
      product: { selectedProduct: Product; isLoading: Boolean };
    }>
  ) {
    this.product$ = this.store.select((state) => state.product.selectedProduct);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // get individual product
    this.store.dispatch(getProduct(this.id));
  }

  createOptionsArray(countInStock: number) {
    return new Array(countInStock);
  }

  onSelectedChange(value: number) {
    this.selectedValue = value;
  }
}

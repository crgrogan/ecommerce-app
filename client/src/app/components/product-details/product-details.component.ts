import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from 'src/models/product.model';
import { getProduct } from 'src/app/actions/products.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product$: Observable<Product>;

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

  createArray(num: number) {
    return new Array(num);
  }
}

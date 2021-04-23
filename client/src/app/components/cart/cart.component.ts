import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addToCart,
  removeCartItem,
  updateQty,
} from 'src/app/store/actions/cart.actions';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  id: string;
  qty: number;
  cartItems$: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{
      cart: { cartItems: Product[] };
    }>
  ) {
    this.cartItems$ = this.store.select((state) => state.cart.cartItems);
  }

  ngOnInit(): void {
    // get product id and quantity from url
    this.id = this.route.snapshot.paramMap.get('id');
    this.qty = Number(this.route.snapshot.queryParamMap.get('qty'));
    // add item to cart
    if (this.id) {
      this.store.dispatch(addToCart(this.id, this.qty));
    }
  }

  createOptionsArray(countInStock: number) {
    return new Array(countInStock);
  }

  updateCartQty(itemId, newQty: number) {
    this.store.dispatch(updateQty(itemId, Number(newQty)));
  }

  deleteCartItem = (itemId: string) => {
    this.store.dispatch(removeCartItem(itemId));
  };

  /*  updateCartQty = (itemId: string, newQty: number) => {
  }; */
}

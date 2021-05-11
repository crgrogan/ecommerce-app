import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import {
  addToCart,
  removeCartItem,
  updateQty,
} from 'src/app/store/actions/cart.actions';
import { selectCartItems } from 'src/app/store/selectors/cart.selectors';
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
    private store: Store<AppState>,
    private router: Router
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
  }

  ngOnInit(): void {
    // check if prevPage is provided in history state to prevent
    // cart from updating on page refresh
    if (history.state.prevPage) {
      // get product id and quantity from url
      this.id = this.route.snapshot.paramMap.get('id');
      this.qty = Number(this.route.snapshot.queryParamMap.get('qty'));
      // add item to cart
      if (this.id) {
        this.store.dispatch(addToCart(this.id, this.qty));
      }
    }
  }

  createOptionsArray(countInStock: number) {
    return new Array(countInStock);
  }

  updateCartQty(itemId: string, newQty: number) {
    this.store.dispatch(updateQty(itemId, Number(newQty)));
  }

  deleteCartItem = (itemId: string) => {
    this.store.dispatch(removeCartItem(itemId));
  };

  checkout() {
    this.router.navigate(['/shipping']);
  }
}

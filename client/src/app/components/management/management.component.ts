import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deleteProduct,
  getProducts,
  resetSaveState,
  saveProduct,
} from 'src/app/store/actions/products.actions';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  faTimes = faTimes;
  isOpen: boolean = false;
  name: string = '';
  description: string = '';
  category: string = '';
  brand: string = '';
  img: string = '';
  price: number = null;
  colour: string = '';
  countInStock: number = null;
  _id: string = '';
  loading$: Observable<boolean>;
  error$: Observable<string>;
  saveMsg$: Observable<string>;
  products$: Observable<Product[]>;

  constructor(
    private store: Store<{
      products: { productsList: Product[]; isLoading: boolean; err: string };
      newProduct: { msg: string; err: string };
    }>
  ) {
    this.products$ = this.store.select((state) => state.products.productsList);
    this.saveMsg$ = this.store.select((state) => state.newProduct.msg);
    this.error$ = this.store.select((state) => state.newProduct.err);
  }

  ngOnInit(): void {
    // get all products
    this.store.dispatch(getProducts(''));
  }

  submitForm(formValues) {
    const {
      _id,
      name,
      brand,
      price,
      img,
      colour,
      category,
      countInStock,
      description,
    } = formValues;
    this.store.dispatch(
      saveProduct({
        _id,
        name,
        brand,
        price,
        img,
        colour,
        category,
        countInStock,
        description,
      })
    );
    window.scroll(0, 0);
  }

  deleteProduct(id: string) {
    this.store.dispatch(deleteProduct(id));
  }

  openModal(product: Product) {
    if (product) {
      this._id = product._id;
      this.name = product.name;
      this.brand = product.brand;
      this.price = product.price;
      this.img = product.img;
      this.category = product.category;
      this.colour = product.colour;
      this.countInStock = product.countInStock;
      this.description = product.description;
    }
    this.isOpen = !this.isOpen;
  }

  closeModal() {
    this._id = '';
    this.name = '';
    this.brand = '';
    this.price = null;
    this.img = '';
    this.category = '';
    this.colour = '';
    this.countInStock = null;
    this.description = '';
    this.isOpen = !this.isOpen;
    window.scroll(0, 0);
    this.store.dispatch(resetSaveState());
  }

  ngOnDestroy(): void {
    // set error state in store back to null
    this.store.dispatch(resetSaveState());
  }
}

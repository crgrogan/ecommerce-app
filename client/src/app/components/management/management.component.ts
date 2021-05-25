import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import {
  deleteFilter,
  filtersUpdatedFailed,
  resetFiltersUpdateState,
  updateFilters,
} from 'src/app/store/actions/filters.actions';
import { getOrders } from 'src/app/store/actions/order.actions';
import {
  deleteProduct,
  getProducts,
  resetSaveState,
  saveProduct,
} from 'src/app/store/actions/products.actions';
import { deleteUser, getUsers } from 'src/app/store/actions/user.actions';
import { updateFiltersReducer } from 'src/app/store/reducers/filters.reducer';
import {
  selectCategoriesList,
  selectBrandsList,
  selectColoursList,
  selectUpdateFiltersLoading,
  selectUpdateFiltersMsg,
  selectUpdateFiltersError,
} from 'src/app/store/selectors/filters.selectors';
import {
  selectOrdersList,
  selectOrdersListLoading,
} from 'src/app/store/selectors/order.selector';
import {
  selectNewProductErr,
  selectNewProductMsg,
  selectProductsList,
  selectNewProductLoading,
  selectProductsListLoading,
} from 'src/app/store/selectors/products.selectors';
import {
  selectUsersList,
  selectUsersListLoading,
} from 'src/app/store/selectors/user.selectors';
import { Category } from 'src/models/category.model';
import { Order } from 'src/models/order.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  productModalOpen: boolean = false;
  filtersModalOpen: boolean = false;
  name: string = '';
  description: string = '';
  category: string = '';
  brand: string = '';
  img: string = '';
  price: number = null;
  colour: string = '';
  countInStock: number = null;
  _id: string = '';
  filterCategoriesName: string = '';
  filterCategoriesImg: string = '';
  filterBrands: string = '';
  filterColours: string = '';
  formIsEmpty: boolean = false;
  newProductLoading$: Observable<boolean>;
  newProductError$: Observable<string>;
  newProductSaveMsg$: Observable<string>;
  products$: Observable<Product[]>;
  productsLoading$: Observable<boolean>;
  categories$: Observable<Category[]>;
  brands$: Observable<string[]>;
  colours$: Observable<string[]>;
  filtersSaveLoading$: Observable<boolean>;
  filtersSaveError$: Observable<string>;
  filtersSaveMsg$: Observable<string>;
  users$: Observable<User[]>;
  usersLoading$: Observable<boolean>;
  orders$: Observable<Order[]>;
  ordersLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.products$ = this.store.select(selectProductsList);
    this.productsLoading$ = this.store.select(selectProductsListLoading);
    this.newProductLoading$ = this.store.select(selectNewProductLoading);
    this.newProductSaveMsg$ = this.store.select(selectNewProductMsg);
    this.newProductError$ = this.store.select(selectNewProductErr);
    this.categories$ = this.store.select(selectCategoriesList);
    this.brands$ = this.store.select(selectBrandsList);
    this.colours$ = this.store.select(selectColoursList);
    this.filtersSaveLoading$ = this.store.select(selectUpdateFiltersLoading);
    this.filtersSaveMsg$ = this.store.select(selectUpdateFiltersMsg);
    this.filtersSaveError$ = this.store.select(selectUpdateFiltersError);
    this.users$ = this.store.select(selectUsersList);
    this.usersLoading$ = this.store.select(selectUsersListLoading);
    this.orders$ = this.store.select(selectOrdersList);
    this.ordersLoading$ = this.store.select(selectOrdersListLoading);
  }

  ngOnInit(): void {
    // get all products
    this.store.dispatch(getProducts('', true));
    // get all users
    this.store.dispatch(getUsers());
    // get all orders
    this.store.dispatch(getOrders());
  }

  // Products
  submitProductForm(form: NgForm) {
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
    } = form.value;
    if (form.valid) {
      this.store.dispatch(
        saveProduct({
          _id: this._id,
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
    }
    window.scroll(0, 0);
    // reset form values and state
    form.resetForm();
  }

  deleteProduct(id: string) {
    this.store.dispatch(deleteProduct(id));
  }

  openProductModal(product: Product) {
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
    this.productModalOpen = !this.productModalOpen;
  }

  closeProductModal() {
    this._id = '';
    this.name = '';
    this.brand = '';
    this.price = null;
    this.img = '';
    this.category = '';
    this.colour = '';
    this.countInStock = null;
    this.description = '';
    this.productModalOpen = !this.productModalOpen;

    window.scroll(0, 0);
    // set error state in store back to null
    this.store.dispatch(resetSaveState());
  }

  // Filters

  openFiltersModal() {
    this.filtersModalOpen = !this.filtersModalOpen;
  }

  submitFiltersForm(form: NgForm) {
    if (Object.values(form.value).every((prop) => prop == '' || prop == null)) {
      this.store.dispatch(
        filtersUpdatedFailed({ error: 'Form cannot be empty' })
      );
      window.scroll(0, 0);
      // reset form values and state
      form.resetForm();
      return;
    }

    const {
      filterCategoriesName,
      filterCategoriesImg,
      filterBrands,
      filterColours,
    } = form.value;
    if (form.valid) {
      this.store.dispatch(
        updateFilters({
          category: {
            name: filterCategoriesName,
            img: filterCategoriesImg,
          },
          brand: {
            name: filterBrands,
          },
          colour: {
            name: filterColours,
          },
        })
      );
    }

    window.scroll(0, 0);
    // reset form values and state
    form.resetForm();
  }

  closeFiltersModal() {
    this.filterCategoriesName = '';
    this.filterCategoriesImg = '';
    this.filterColours = '';
    this.filterBrands = '';
    this.filtersModalOpen = !this.filtersModalOpen;
    // set error state in store back to null
    this.store.dispatch(resetFiltersUpdateState());
    window.scroll(0, 0);
  }

  deleteFilter(id: string, category: string) {
    this.store.dispatch(deleteFilter(id, category));
  }

  // users
  deleteUser(id: string) {
    this.store.dispatch(deleteUser(id));
  }

  viewOrderDetails(id: string) {
    this.router.navigate(['/order', id]);
  }

  ngOnDestroy(): void {
    // set error state in store back to null
    this.store.dispatch(resetSaveState());
    this.store.dispatch(resetFiltersUpdateState());
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deleteFilter,
  filtersUpdatedFailed,
  resetFiltersUpdateState,
  updateFilters,
} from 'src/app/store/actions/filters.actions';
import {
  deleteProduct,
  getProducts,
  resetSaveState,
  saveProduct,
} from 'src/app/store/actions/products.actions';
import { updateFiltersReducer } from 'src/app/store/reducers/filters.reducer';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
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
  loading$: Observable<boolean>;
  error$: Observable<string>;
  saveMsg$: Observable<string>;
  products$: Observable<Product[]>;
  categories$: Observable<[]>;
  brands$: Observable<[]>;
  colours$: Observable<[]>;
  filtersSaveLoading$: Observable<boolean>;
  filtersSaveError$: Observable<string>;
  filtersSaveMsg$: Observable<string>;

  constructor(
    private store: Store<{
      products: { productsList: Product[] };
      newProduct: { msg: string; err: string; isLoading };
      filters: { categoriesList: []; brandsList: []; coloursList: [] };
      updateFilters: { isLoading: boolean; msg: string; err: string };
    }>
  ) {
    this.products$ = this.store.select((state) => state.products.productsList);
    this.loading$ = this.store.select((state) => state.newProduct.isLoading);
    this.saveMsg$ = this.store.select((state) => state.newProduct.msg);
    this.error$ = this.store.select((state) => state.newProduct.err);
    this.categories$ = this.store.select(
      (state) => state.filters.categoriesList
    );
    this.brands$ = this.store.select((state) => state.filters.brandsList);
    this.colours$ = this.store.select((state) => state.filters.coloursList);
    this.filtersSaveLoading$ = this.store.select(
      (state) => state.updateFilters.isLoading
    );
    this.filtersSaveMsg$ = this.store.select(
      (state) => state.updateFilters.msg
    );
    this.filtersSaveError$ = this.store.select(
      (state) => state.updateFilters.err
    );
  }

  ngOnInit(): void {
    // get all products
    this.store.dispatch(getProducts(''));
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

  ngOnDestroy(): void {
    // set error state in store back to null
    this.store.dispatch(resetSaveState());
    this.store.dispatch(resetFiltersUpdateState());
  }
}

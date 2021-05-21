import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { NgxPayPalModule } from 'ngx-paypal';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { FiltersEffects } from './store/effects/filters.effects';
import { ProductsEffects } from './store/effects/products.effects';
import { CartEffects } from './store/effects/cart.effects';
import { GetCartTotalPipe } from './components/cart/cart-total.pipe';
import { reducers } from './store';
import { UserEffects } from './store/effects/user.effects';
import { GetOrderTotalPipe } from './components/order/order-total.pipe';
import { OrderEffects } from './store/effects/order.effects';
import { PasswordMatchValidatorDirective } from './shared/password-match.directive';
import { FilterCategoryValidatorDirective } from './shared/filter-category.directive';
import { AuthInterceptor } from './auth/auth-error-handler';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { ManagementComponent } from './components/management/management.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { CheckoutStepsComponent } from './components/checkout-steps/checkout-steps.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GetTotalCartItemsPipe } from './components/cart/cart-items.pipe';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  // save slices of state specified in keys array to local storage
  return localStorageSync({
    keys: [
      { cart: ['cartItems', 'shippingAddress', 'paymentMethod'] },
      { currentUser: ['userInfo'] },
    ],
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CartComponent,
    RegisterComponent,
    ManagementComponent,
    FooterComponent,
    ProductCardComponent,
    ProductListComponent,
    CategoryCardComponent,
    ProductDetailsComponent,
    ProfileComponent,
    GetCartTotalPipe,
    GetTotalCartItemsPipe,
    GetOrderTotalPipe,
    PasswordMatchValidatorDirective,
    FilterCategoryValidatorDirective,
    ShippingComponent,
    CheckoutStepsComponent,
    PaymentComponent,
    OrderComponent,
    OrderDetailsComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([
      FiltersEffects,
      ProductsEffects,
      CartEffects,
      UserEffects,
      OrderEffects,
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    FontAwesomeModule,
    AppRoutingModule,
    IvyCarouselModule,
    NgxPayPalModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

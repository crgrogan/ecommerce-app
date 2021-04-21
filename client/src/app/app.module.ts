import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { filtersReducer } from './reducers/filters.reducer';
import { productsReducer, productReducer } from './reducers/products.reducer';
import { FiltersEffects } from './effects/filters.effects';
import { ProductsEffects, ProductEffects } from './effects/products.effects';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EffectsModule.forRoot([FiltersEffects, ProductsEffects, ProductEffects]),
    StoreModule.forRoot({
      filters: filtersReducer,
      products: productsReducer,
      product: productReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    FontAwesomeModule,
    AppRoutingModule,
    IvyCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

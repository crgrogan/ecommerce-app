import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', redirectTo: 'products/', pathMatch: 'full' },
  { path: 'products/:filter?', component: ProductListComponent },
  { path: 'products/selected/:id', component: ProductDetailsComponent },
  { path: 'cart', redirectTo: 'cart/', pathMatch: 'full' },
  { path: 'cart/:id', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'management', component: ManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ShippingComponent } from './components/shipping/shipping.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', redirectTo: 'products/', pathMatch: 'full' },
  { path: 'products/:filter?', component: ProductListComponent },
  { path: 'products/selected/:id', component: ProductDetailsComponent },
  { path: 'cart', redirectTo: 'cart/', pathMatch: 'full' },
  { path: 'cart/:id', component: CartComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:id', component: OrderDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

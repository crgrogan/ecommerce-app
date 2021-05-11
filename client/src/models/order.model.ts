import { Product } from './product.model';
import { ShippingAddress } from '../app/store/reducers/cart.reducer';

export interface Order {
  cartItems: Product[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: string;
  shippingCost: number;
  totalPrice: string;
}

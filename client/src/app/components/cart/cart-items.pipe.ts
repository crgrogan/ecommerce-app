import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/models/product.model';

@Pipe({
  name: 'getTotalCartItems',
})
export class GetTotalCartItemsPipe implements PipeTransform {
  // gets total of cart items to two decimal places
  transform(items: Product[]): number {
    return items.reduce((a, c) => {
      return a + c.qty;
    }, 0);
  }
}

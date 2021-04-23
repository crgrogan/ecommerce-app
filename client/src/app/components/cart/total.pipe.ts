import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/models/product.model';

@Pipe({
  name: 'getCartTotal',
})
export class GetCartTotalPipe implements PipeTransform {
  // gets total of cart items to two decimal places
  transform(items: Product[]): string {
    return items
      .reduce((a, c) => {
        return a + c.price * c.qty;
      }, 0)
      .toFixed(2);
  }
}

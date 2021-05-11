import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getOrderTotal',
})
export class GetOrderTotalPipe implements PipeTransform {
  // gets total of cart items to two decimal places
  transform(subtotal: string, shipping: number): string {
    return (Number(subtotal) + shipping).toFixed(2);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortOptionsAlphabetically',
})
export class SortOptionsAlphabeticallyPipe implements PipeTransform {
  // gets total of cart items to two decimal places
  transform(options) {
    return [...options].sort((a, b) => a.name.localeCompare(b.name));
  }
}

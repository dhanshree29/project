// Filter recipes based on serach string.

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipesearch',
  pure: false
})
export class RecipesearchPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (!value) { return null; }
    if (!args) { return value; }
    // The filter() method creates an array filled with all array elements that pass a test.
    return value.filter(function (item) {
      let arg = args.toLowerCase();
      return JSON.stringify(item).toLowerCase().includes(arg);
    });
  }
}

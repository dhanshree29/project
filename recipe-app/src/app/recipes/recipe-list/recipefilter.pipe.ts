// Filter recipes based on type(veg, nonveg).
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipefilter',
  pure: false
})
export class recipefilterPipe implements PipeTransform {
  transform(values: any, args?: any[]): any {
    return values = values.filter(a => {
      return args.length ? args.indexOf(a.indicator) != -1 : values;
    });
  }
}

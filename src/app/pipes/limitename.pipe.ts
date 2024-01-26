import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitename'
})
export class LimitenamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.length > 16 ? value.substring(0, 15) + '...' : value;
  }

}

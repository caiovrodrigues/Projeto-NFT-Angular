import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstletter',
    standalone: false
})
export class FirstletterPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value.charAt(0);
  }

}

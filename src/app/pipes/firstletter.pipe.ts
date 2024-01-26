import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstletter'
})
export class FirstletterPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    console.log('value pipe: ', value);
    
    return value.charAt(0);
  }

}

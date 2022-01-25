import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelRemover'
})
export class VowelRemoverPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    const input = value;
    let vowels: string[] = ['a', 'b', 'c', 'd', 'e'];

    return input;
  }

}

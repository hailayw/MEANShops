import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'takeFirstletters'
})
export class TakeFirstlettersPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let input = value;

    //single word
    if (input.indexOf(' ') === -1 && input.indexOf('-') === -1)
      input = input[0].toUpperCase();
    //combined word with '-'
    else if(input.indexOf('-') !== -1)
      input = input[0]+input.charAt(input.indexOf('-')+1);
    //combined word with ' '
    else
      input = input[0]+input.charAt(input.indexOf(' ')+1);

    return input;
  }

}

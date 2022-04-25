import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    let regex: RegExp = /(^[0-9]+)/;
    let newDate: any = regex.exec(value);
    return newDate[1];
  }
}

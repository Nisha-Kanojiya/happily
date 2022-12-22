
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'DateFormatPipe',
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string) {
       let datePipe = new DatePipe('en-US');
       value = datePipe.transform(value, 'medium');
       return value;
    }
}


import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, ...args: any[]): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 60) // less than 1 minute
        return 'Just now';
      else if (seconds < 180) // less than 3 minutes
        return `${(seconds / 60).toFixed(0)} minutes ago` ;
      else
        return this.datePipe.transform(value, 'HH:mm, dd.MM.yyyy'); //medium
    }
    return value;
  }

}
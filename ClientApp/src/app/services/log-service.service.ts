import { Injectable, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  date = ''

  constructor(public datePipe: DatePipe) { }

  log(text) {
    this.date = this.datePipe.transform(Date(), 'hh:mm:ss yyyy/MM/dd')
    console.log(this.date + ': ' + text)
  }
}

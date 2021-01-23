import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {

  e: number = Math.E
  str: string = 'hello world'
  date: Date = new Date()
  float = 0.42
  obj = {
    a: 1,
    b: 2,
    c: {
      e: 4,
      f: 'fsdfgsdfg'
    }
  }

  p: Promise<string> = new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('Promise resolved')
    }, 4000)
  })

  date2: Observable<Date> = new Observable<Date>(obs => {
    setInterval(() => {
      obs.next(new Date())
    }, 1000)
  })

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }



}

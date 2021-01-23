import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//export interface Todo {
//  completed: boolean
//  title: string
//  id?: number
//}


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

 // todos: Todo[] = []

//  constructor(private http: HttpClient) { }

  //ngOnInit(): void {
  //  this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //    .subscribe(todos => {
  //      console.log("response", todos);
  //    this.todos = todos
  //  })
  //}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<adrList[]>("https://localhost:5001/api/AddressesListValues")
      .subscribe(result => {
        this.al = result
    })
  }

  public al: adrList[];

  holeCable: number = 0;
  inputCable: number = 0;
  borozdyCount: number = 0;

  borozdyCountAction() {
    this.borozdyCount = (this.holeCable - this.inputCable) / 500
  }

  holeCableEntered(value: number) {
    this.holeCable = value
  }

  inputCableEntered(val: number) {
    console.log("hole:" + this.holeCable)
    console.log("val:" + val)
    this.inputCable = val
  }

  resetInputCable() {
    this.inputCable = 0
  }

}

interface adrList {
  name: string;
}

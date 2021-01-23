import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Todo, TodosService } from './todos.service'

@Component({
  selector: 'app-http-client-lab',
  templateUrl: './http-client-lab.component.html',
  styleUrls: ['./http-client-lab.component.scss']
})
export class HttpClientLabComponent implements OnInit {

  todos: Todo[] = [] // принимает пустое значение массива
  todoTitle = ''
  loading = false
  errorMess = ''

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return null
    }

    this.todosService.addTodo({
      title: this.todoTitle,
      completed: false
    }).subscribe(todo => {
      this.todos.push(todo)
      this.todoTitle = ''
    })
  }

  fetchTodos() {
    this.loading = true
    this.todosService.fetchTodos()
      .subscribe(todos => {
        //console.log(todos)
        this.todos = todos
        this.loading = false
      }, error => {
        console.log(error.message)
        this.errorMess = error.message
      })
  }
  removeTodo(id: number) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id)
      })
  }

  completeTodo(id: number) {
    this.todosService.completeTodo(id).subscribe(todo => {
      this.todos.find(t => t.id === todo.id).completed = true
    })
  }
}

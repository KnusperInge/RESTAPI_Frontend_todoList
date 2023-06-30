import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'src/environments/environments.prod';
import { Subject, lastValueFrom, startWith, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor(public http: HttpClient) {}
  url = environments.baseUrl + '/todos/';
  todoUpdate = new Subject<void>();
  getAllTodos() {
    const todo = this.todoUpdate.pipe(
      startWith({}),
      switchMap(() => this.http.get<any>(this.url))
    );
    return todo;
  }

  createNewTodo(form: any) {
    const body = { title: form.title, description: form.description };
    const createTodo = this.http.post<any>(this.url, body).pipe(
      tap(() => {
        this.todoUpdate.next();
      })
    );
    return createTodo;
  }

  changeTodo(form: any, id: number) {
    const body = {
      id: id,
      title: form.title,
      description: form.description,
      checked: form.checked,
    };
    const changeTodo = this.http.put<any>(this.url, body).pipe(
      tap(() => {
        this.todoUpdate.next();
      })
    );
    return changeTodo;
  }

  deleteTodo(id) {
    const body = { id: id };
    const changeTodo = this.http.delete<any>(this.url, { body }).pipe(
      tap(() => {
        this.todoUpdate.next();
      })
    );
    return changeTodo;
  }
}

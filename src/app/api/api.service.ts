import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../Todo';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.baseUrl + 'tasks');
  }

  postTask(note: Todo) {
    return this.http.post(this.baseUrl + 'tasks', note);
  }

  putTask(task: Todo) {
    return this.http.put(this.baseUrl + 'tasks/' + task.id, task);
  }

  deleteTask(task: Todo) {
    return this.http.delete(this.baseUrl + 'tasks/' + task.id);
  }
}

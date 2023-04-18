import { Component } from '@angular/core';
import { Todo } from './Todo';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todolist';
  constructor(private api: ApiService) {
    this.getTasks();
  }
  list: Todo[] = [];

  todoTask: Todo = new Todo();

  searchData: string = '';

  isEditBtnClicked: boolean = false;

  ngOnInit() {
    if (this.list.length == 0) {
      this.list = [
        {
          id: 1,
          title: 'Title 1',
          des: 'Title 1 dummy description.',
          dateCreated: new Date().toLocaleDateString(),
        },
      ];
    }
  }

  editTask(task: Todo) {
    this.isEditBtnClicked = true;
    this.todoTask = task;
  }

  addTasks() {
    this.todoTask.id = 0;
    this.todoTask.dateCreated = new Date().toLocaleDateString();

    if (this.todoTask.title.trim() != '' || this.todoTask.des.trim() != '') {
      if (this.todoTask.title.trim() == '') {
        this.todoTask.title = 'Unknown';
      }

      this.api.postTask(this.todoTask).subscribe(
        (res) => {
          alert('Todo item added !');
          this.getTasks();
          this.todoTask = new Todo();
        },
        (error) => {
          alert(error);
        }
      );
    }
  }

  searchList: Todo[] = [];
  searchTask() {
    this.searchList = [];

    this.list.forEach((item) => {
      if (
        item.title.toLowerCase == this.searchData.toLowerCase ||
        item.des.toLowerCase == this.searchData.toLowerCase
      ) {
        this.searchList.push(item);
      }
    });
  }

  getTasks() {
    this.list = [];
    this.api.getTasks().subscribe(
      (res) => {
        this.list = res as Todo[];
        this.list.reverse();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateTask() {
    if (this.todoTask.title.trim() != '' || this.todoTask.title.trim() != '') {
      if (this.todoTask.title.trim() == '') {
        this.todoTask.title = 'Unknown';
      }

      this.api.putTask(this.todoTask).subscribe(
        (res) => {
          alert('TODO task updated !');
          this.getTasks();
          this.todoTask = new Todo();
        },
        (error) => {
          alert(error);
        }
      );
    }
  }

  deleteTask(task: Todo) {
    this.api.deleteTask(task).subscribe(
      (res) => {
        alert('TODO task deleted !');
        this.getTasks();
      },
      (error) => {
        alert(error);
      }
    );
  }

  deleteAll() {
    if (confirm('Do you want to delete all tasks ?')) {
      this.list.forEach((item) => {
        this.api.deleteTask(item).subscribe((res) => {});
      });
    }
  }
}

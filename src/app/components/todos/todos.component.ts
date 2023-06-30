import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToDoService } from 'src/app/services/todo.service';
import { DialogComponent } from './dialog/dialog.component';

export interface DialogData {
  change: false;
  todo: '';
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todos: ToDoService, private dialog: MatDialog) {}

  token: string = '';
  alltodos: any;
  errMessage: boolean = false;

  ngOnInit() {
    this.todos.getAllTodos().subscribe((res) => {
      this.alltodos = res;
    });
  }

  openDialog(change, todo?) {
    this.dialog.open(DialogComponent, {
      data: {
        todo: todo,
        change: change,
      },
    });
  }
}

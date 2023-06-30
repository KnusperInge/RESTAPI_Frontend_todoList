import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../todos.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToDoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  change: boolean = false;
  todo: any = {};
  todoForm: FormGroup;
  checked: boolean = false;
  // title: string = '';
  // description: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private ts: ToDoService
  ) {
    if (data.todo === undefined) {
      this.todo = {};
    } else {
      this.todo = data.todo;
      this.checked = this.todo.checked;
    }
    this.change = data.change;

    this.todoForm = this.fb.group({
      title: [this.todo.title, Validators.required],
      description: [this.todo.description, Validators.required],
      checked: [this.checked],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createTodo() {
    console.log(this.todoForm.value);
    this.closeDialog();
    this.ts.createNewTodo(this.todoForm.value).subscribe((res) => {
      console.log('gespeichert:', res);
    });
  }
  changeTodo() {
    this.closeDialog();
    this.ts.changeTodo(this.todoForm.value, this.todo.id).subscribe((res) => {
      console.log('Änderung erfolgreich', res.title);
    });
  }

  deleteTodo() {
    this.closeDialog();
    this.ts.deleteTodo(this.todo.id).subscribe((res) => {
      console.log('ToDo erfolgreich gelöscht', res);
    });
  }
}

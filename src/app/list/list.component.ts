import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, getCreatePayload } from '../app.reducer';
import { AppServiceService } from '../services/app-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  taskList = [];
  editId = '';
  taskTableForm;
  statusList = ['Active', 'In-Active'];
  constructor(
    private store: Store<AppState>,
    private service: AppServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.select(getCreatePayload).subscribe((list) => {
      if (list) {
        this.taskList = list;
        this.taskTableForm = this.fb.group({
          rows: this.fb.array([]),
        });
        this.setValuesInFormArray();
      }
    });
  }

  get formArr() {
    return this.taskTableForm.get('rows') as FormArray;
  }

  setValuesInFormArray() {
    this.taskList.forEach((task) => {
      this.formArr.push(
        this.fb.group({
          id: [task.id],
          date: [task.date, Validators.required],
          taskName: [task.taskName, Validators.required],
          status: [task.status, Validators.required],
          action: [task.action, Validators.required],
          isEdit: [false],
        })
      );
    });
  }

  onDelete(index) {
    swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.formArr.removeAt(index);
          const data = this.formArr.value;
          data.forEach(task => {
              if(task.hasOwnProperty('isEdit')) {
                  delete task.isEdit;
              }
          });
          this.service.addUpdateDeleteTask(data);
          swal.fire('Deleted!', 'Your data has been deleted.', 'success');
        }
      });
  }

  getEditValue(task) {
    return task.controls.isEdit.value;
  }

  editTask(task) {
    const value = !task.controls.isEdit.value;
    task.controls.isEdit.setValue(value);
  }

  update(task) {
    if(task.valid) {
        const data = this.formArr.value;
        data.forEach(task => {
            if(task.hasOwnProperty('isEdit')) {
                delete task.isEdit;
            }
        });
        this.service.addUpdateDeleteTask(data);
        swal.fire('Updated!', 'Your data has been Updated.', 'success');
        const value = !task.controls.isEdit.value;
        task.controls.isEdit.setValue(value);
    }
  }
}

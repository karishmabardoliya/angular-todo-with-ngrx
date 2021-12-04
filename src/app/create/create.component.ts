import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Create } from '../app.action';
import { AppState, getCreatePayload } from '../app.reducer';
import { AppServiceService } from '../services/app-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  statusList = ['Active', 'In-Active'];
  taskForm;
  taskList = new Array()
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private service: AppServiceService
    ) {
    this.taskForm = this.fb.group({
      id: [''],
      date: ['', Validators.required],
      taskName: ['', Validators.required],
      status: ['', Validators.required],
      action: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.select(getCreatePayload).subscribe(list => {
      if(list) {
        this.taskList = list;
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.valid) {
      const createData = this.taskForm.value;
      createData.id = this.taskList.length + 1;
      this.taskList = Object.assign([], this.taskList);
      this.taskList.push(createData);
      this.service.addUpdateDeleteTask(this.taskList);
      swal.fire('Created!', 'Your data has been created.', 'success');
      this.taskForm.reset();
    }
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getCreatePayload } from '../app.reducer';
import { Create } from '../app.action';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private store: Store<AppState>) {}

  taskListOnInitialize() {
    const data = [
      {
        id: 1,
        date: '2021-12-04',
        taskName: 'Test 1',
        status: 'Active',
        action: 'In-progress',
      }
    ];
    this.store.dispatch(new Create(data));
  }

  addUpdateDeleteTask(task) {
    this.store.dispatch(new Create(task));
  }

  getTaskList() {
    this.store.select(getCreatePayload).subscribe((list) => {
      if (list) {
        return list;
      } else {
        return [];
      }
    });
  }
}

import { Component } from '@angular/core';
import { AppServiceService } from './services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-demo';
  constructor(
    private service: AppServiceService
  ) {
    /** This method call at a time of initialization and on refresh */
    this.service.taskListOnInitialize();
  }
}

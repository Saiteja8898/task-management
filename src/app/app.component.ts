import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { clearTasksFromLS, setItemInLS } from './utils';
import { tasks } from './const';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'spry-task-management';
  constructor() {}
  ngOnInit(): void {
    setItemInLS(tasks)
  }

  ngOnDestroy() {
    clearTasksFromLS()
  }
}

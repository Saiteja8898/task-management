import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { tasks } from './const';
import { clearTasksFromLS, setItemInLS } from './utils';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { Status } from './enum';
import { Task } from './types';
import { TasksFacadeService } from '../tasks.facade.service';
import { getItemsFromLS } from '../utils';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TaskListComponent, TaskFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  StatusEnum = Status;
  showTaskForm = false;
  taskToUpdate: Task | undefined | null;
  tasksList$: Observable<Task[] | undefined> | undefined;
  loading$: Observable<boolean> | undefined;
  pageLoading$: Observable<boolean> | undefined;
  message$: Observable<string | undefined> | undefined;
  summary$: Observable<Record<Status, number>> | undefined;
  constructor(private taskService: TasksFacadeService) {}

  ngOnInit() {
    this.taskService.loadTasks();
    this.pageLoading$ = this.taskService.isPageLoading$;
    this.loading$ = this.taskService.isLoading$;
    this.message$ = this.taskService.getMessage();
    this.tasksList$ = this.taskService.tasks$;
    this.summary$ = this.taskService.getSummary()
  }
  onCreateTask() {
    this.showTaskForm = true
  }

  onEditTask(task: Task) {
    this.showTaskForm = true;
    this.taskToUpdate = task
  }

  onSaveTask(task: Task) {
    console.log(task);
    this.taskService.saveTask(task)
    this.showTaskForm = false
  }

  onUpdateTask(task: Task) {
    this.taskService.updateTask(task);
    this.showTaskForm = false;
    this.taskToUpdate = null;
  }

  onDeleteTask(task: Task){
    this.taskService.deleteTask(task);
  }

  onCloseForm() {
    this.showTaskForm = false
  }
}

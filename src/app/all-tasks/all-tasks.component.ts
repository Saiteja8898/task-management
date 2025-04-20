import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { Observable } from 'rxjs';
import { Status } from '../dashboard/enum';
import { Task } from '../dashboard/types';
import { TasksFacadeService } from '../tasks.facade.service';
import { SortOrder } from '../types';
import { v4 as uuid } from 'uuid';
import { TaskFormComponent } from '../components/task-form/task-form.component';
@Component({
  selector: 'app-all-tasks',
  imports: [CommonModule, TaskListComponent, TaskFormComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
  providers: [TasksFacadeService]
})
export class AllTasksComponent implements OnInit {
  
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
    this.taskService.saveTask({...task, id: uuid().slice(0,5)})
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

  onFilterByStatus(status: Status) {
    this.taskService.filterBy({status});
  }

  onSort(column: string) {
    const sortOrder: SortOrder = this.taskService.filters$.value?.sortOrder === 'asc' ? 'desc' : 'asc'
    this.taskService.filterBy({sortBy: column, sortOrder})
  }

  onCloseForm() {
    this.showTaskForm = false
  }
}

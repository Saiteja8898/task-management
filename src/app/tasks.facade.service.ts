import { ApiResponse } from './types';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, ReplaySubject, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { tasks } from './const';
import { calculateSummary, getItemsFromLS, setItemInLS } from './utils';
import { Task } from './dashboard/types';
import { TasksService } from './tasks.service';
import { Status } from './dashboard/enum';

@Injectable({
  providedIn: 'any'
})
export class TasksFacadeService implements OnDestroy {

  tasks$: Observable<Task[] | undefined>;
  loadTasks$ = new ReplaySubject<void>();
  saveTask$ = new Subject<Task>();
  updateTask$ = new Subject<Task>();
  deleteTask$ = new Subject<Task>();
  private unsubscribe$ = new Subject<void>()
  pageLoading$ = new BehaviorSubject<boolean>(true);
  loading$ = new BehaviorSubject<boolean>(false);
  message$ = new BehaviorSubject<string | undefined>('');
  summary$ = new BehaviorSubject<Record<Status,number>>({[Status.pending]: 0, [Status.inProgress]: 0, [Status.completed]: 0});
  constructor(private taskService: TasksService) {
    this.tasks$ = this.loadTasks$.pipe(tap(_ => this.loading$.next(true)),delay(500),switchMap(_ => this.taskService.getTasks()),map((res: ApiResponse<Task[]>) => {
      this.loading$.next(false);
      this.pageLoading$.next(false);
      this.message$.next(res.status === 'Success' ? '' : res.error);
      this.summary$.next(calculateSummary(res.data as Task[]))
      return res.data
    }));

    this.saveTask$.pipe(tap(_ => this.loading$.next(true)),delay(500), switchMap(task => this.taskService.saveTask(task)), takeUntil(this.unsubscribe$)).subscribe((res: ApiResponse<Task>) => {
      this.loading$.next(false);
      this.message$.next(res.status === 'Success' ? 'Task Created Successfully' : res.error);
      this.loadTasks()
    }
    )

    this.updateTask$.pipe(tap(_ => this.loading$.next(true)),delay(500), switchMap(task => this.taskService.updateTask(task)), takeUntil(this.unsubscribe$)).subscribe((res: ApiResponse<Task>) => {
      this.loading$.next(false);
      this.message$.next(res.status === 'Success' ? 'Task Updated Successfully' : res.error);
      this.loadTasks()
    }
    )
    this.deleteTask$.pipe(tap(_ => this.loading$.next(true)),delay(500), switchMap(task => this.taskService.deleteTask(task)), takeUntil(this.unsubscribe$)
    ).subscribe((res: ApiResponse<Task>) => {
      this.loading$.next(false);
      this.message$.next(res.status === 'Success' ? 'Task Deleted Successfully' : res.error)
      this.loadTasks()
    }
    )
  }
  loadTasks() {
    this.loadTasks$.next()
  }

  get isLoading$() {
    return this.loading$.asObservable()
  }

  get isPageLoading$() {
    return this.pageLoading$.asObservable()
  }

  getMessage() {
    return this.message$.asObservable()
  }

  getSummary() {
    return this.summary$.asObservable()
  }

  saveTask(task: Task) {
    this.saveTask$.next(task)
  }

  updateTask(task: Task) {
    this.updateTask$.next(task)
  }

  deleteTask(task: Task) {
    this.deleteTask$.next(task)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, Subject, tap } from 'rxjs';
import { tasks } from './const';
import { deleteItemInLS, getItemsFromLS, setItemInLS, updateItemInLS } from './utils';
import { Task } from './dashboard/types';
import { ApiResponse, Filters } from './types';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    constructor() {
    }
    saveTask(task: Task | Task[]): Observable<ApiResponse<Task>> {
        try {
            setItemInLS(task)

            return of({
                status: 'Success',
                data: task as Task
            })
        }
        catch (e) {
            return of({
                status: 'Error',
                error: 'Task creation failed'
            })
        }
    }

    updateTask(task: Task): Observable<ApiResponse<Task>> {
        try {
            updateItemInLS(task)

            return of({
                status: 'Success',
                data: task as Task
            })
        }
        catch (e) {
            return of({
                status: 'Error',
                error: 'Task update failed'
            })
        }
    }

    deleteTask(task: Task): Observable<ApiResponse<Task>> {
        try {
            deleteItemInLS(task)

            return of({
                status: 'Success',
                data: task as Task
            })
        }
        catch (e) {
            return of({
                status: 'Error',
                error: 'Task deletion failed'
            })
        }
    }

    getTasks(filters: Filters | null): Observable<ApiResponse<Task[]>> {
        try {
            let tasks = getItemsFromLS()
            if (filters?.sortBy === 'duedate') { // to handle other sort columns
                tasks = tasks.sort((a: Task, b: Task) => { 
                    const dateA = new Date(a.duedate).getTime(); 
                    const dateB = new Date(b.duedate).getTime(); 
                    return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA; });
            }
            if (filters?.status) {
                tasks = tasks.filter(item => item.status === filters.status)
            }

            return of({
                status: 'Success',
                data: tasks
            })
        }
        catch (e) {
            return of({
                status: 'Error',
                error: 'Error while loading Tasks'
            })
        }
    }
}

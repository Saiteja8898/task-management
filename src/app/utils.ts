import { Observable, of } from "rxjs";
import { LS_KEY } from "./const";
import { Task } from "./dashboard/types";
import { ApiResponse } from "./types";
import { Status } from "./dashboard/enum";

export function setItemInLS(task: Task | Task[]) {
    if(typeof window !== 'undefined') {
        const savedTasks = getItemsFromLS() ?? [];
        const allTasks = Array.isArray(task) ? [...task,...savedTasks ] : [task, ...savedTasks ]
        window.localStorage.setItem(LS_KEY,JSON.stringify(allTasks))
    } else {
        throw new Error('Task Creation Failed')
    }
}

export function updateItemInLS(task: Task) {
    if(typeof window !== 'undefined') {
        const savedTasks = getItemsFromLS() ?? [];
        const taskIndex = savedTasks.findIndex((item:Task) => item.id === task.id)
        if(taskIndex !== -1) {
            savedTasks[taskIndex]= task
            window.localStorage.setItem(LS_KEY,JSON.stringify(savedTasks))
        }
    } else {
        throw new Error('Task Creation Failed')
    }
}

export function deleteItemInLS(task: Task) {
    if(typeof window !== 'undefined') {
        const savedTasks = getItemsFromLS() ?? [];
        const updatedTasks = savedTasks.filter((item:Task) => item.id !== task.id)
        window.localStorage.setItem(LS_KEY,JSON.stringify(updatedTasks))
    } else {
        throw new Error('Task Creation Failed')
    }
}

export function getItemsFromLS(): Task[] {
    if(typeof window !=='undefined') {
        return JSON.parse(window.localStorage.getItem(LS_KEY) || '[]')
    }
    return []
}

export function clearTasksFromLS() {
    if(typeof window !=='undefined') {
        return window.localStorage.removeItem(LS_KEY)
    }
}

export const calculateSummary = (tasks: Task[]): Record<Status, number> => {
    return tasks.reduce((acc, curr) => ({...acc, [curr.status]: (acc[curr.status] ?? 0) + 1 }), {[Status.pending]: 0, [Status.inProgress]: 0, [Status.completed]: 0} as Record<Status, number>)
}
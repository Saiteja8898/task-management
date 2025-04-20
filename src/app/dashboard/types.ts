import { Status } from "./enum";

export interface Task {
    id: number;
    title: string,
    description: string,
    status: Status,
    dueDate: string
}
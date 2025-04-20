import { Status } from "./enum";

export interface Task {
    id: string;
    title: string,
    description: string,
    status: Status,
    duedate: string
}
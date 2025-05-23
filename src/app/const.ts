import { Status } from "./dashboard/enum";
import { Task } from "./dashboard/types";

export const tasks:Task[] = [
    {id: '5', title: 'Add Form Component', description: 'To add form component with necessary fields and validations', status: Status.completed, duedate: '2025-04-18'},
    {id: '9', title: 'Add Summary Details', description: 'To add summary of individual status', status: Status.completed, duedate: '2025-04-18'}
]

export const LS_KEY = 'spry-tasks'
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../dashboard/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasksList: Task[] | null | undefined = [];
  @Input() loading = false;
  @Input() message = ''
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../dashboard/types';
import { CommonModule } from '@angular/common';
import { Status } from '../../dashboard/enum';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  showStatusOverlay = false;
  StatusEnum = Status;
  @Input() tasksList: Task[] | null | undefined = [];
  @Input() loading = false;
  @Input() message = ''
  @Input() allowStatusFilter= false;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() filterByStatus = new EventEmitter<Status>();
  @Output() sort = new EventEmitter<string>();

  onShowStatusOverlay() {
    this.showStatusOverlay = !this.showStatusOverlay
  }

  onFilterByStatus(status: Status) {
    this.filterByStatus.emit(status)
  }

  onSort(column: string) {
    this.sort.emit(column)
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Status } from '../../dashboard/enum';
import { Task } from '../../dashboard/types';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  statusList = Object.values(Status);
  @Input() isEdit = false;
  @Input() task: Task | undefined | null;
  form!: FormGroup;
  @Output() save = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() close = new EventEmitter();

  getErrors(control: string):any {
    return this.form.get(control)?.touched && this.form.get(control)?.errors;
  }
  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [this.isEdit ? this.task?.title : '', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      description: [this.isEdit ? this.task?.description : '', [Validators.maxLength(50)]],
      status: [this.isEdit ? this.task?.status: Status.pending, [Validators.required]],
      duedate: [this.isEdit ? this.task?.dueDate : '', [Validators.required]]
    })
  }

  onSubmit() {
    this.form.valid && (this.isEdit ? this.update.emit(this.form.value) : this.save.emit(this.form.value))
  }
}

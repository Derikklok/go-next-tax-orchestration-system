import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private fb = inject(FormBuilder);

  initialValue = input<Partial<Task>>();
  showStatus = input(false);
  submitLabel = input('Create Task');

  @Output() submitted = new EventEmitter<{
    title: string;
    description: string;
    status?: TaskStatus;
  }>();

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    status: ['pending' as TaskStatus],
  });

  ngOnInit(): void {
    const value = this.initialValue();

    if (value) {
      this.form.patchValue({
        title: value.title ?? '',
        description: value.description ?? '',
        status: value.status ?? 'pending',
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.showStatus()) {
      this.submitted.emit(value);
      return;
    }

    this.submitted.emit({
      title: value.title,
      description: value.description,
    });
  }
}

import { Component, inject } from '@angular/core';
import { TaskApiService } from '../../services/task-api.service';
import { Router } from '@angular/router';
import { CreateTaskRequest } from '../../models/task.model';
import { TaskForm } from '../../components/task-form/task-form';

@Component({
  selector: 'app-task-create-page',
  standalone:true,
  imports: [TaskForm],
  templateUrl: './task-create-page.html',
  styleUrl: './task-create-page.scss',
})
export class TaskCreatePage {
  private readonly taskApi = inject(TaskApiService);
  private readonly router = inject(Router);

   onCreateTask(payload: CreateTaskRequest): void {
    this.taskApi.createTask(payload).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      }
    });
  }
}

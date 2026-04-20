import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApiService } from '../../services/task-api.service';
import { Task, TaskStatus, UpdateTaskRequest } from '../../models/task.model';
import { TaskForm } from "../../components/task-form/task-form";

@Component({
  selector: 'app-task-edit-page',
  standalone: true,
  imports: [TaskForm],
  templateUrl: './task-edit-page.html',
  styleUrl: './task-edit-page.scss',
})
export class TaskEditPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskApi = inject(TaskApiService);

  task = signal<Task | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.taskApi.getTask(id).subscribe({
      next: (response) => {
        this.task.set(response.data);
      },
    });
  }

  onUpdateTask(formValue: {
    title: string;
    description: string;
    status?: TaskStatus;
  }): void {
    const currentTask = this.task();

    if (!currentTask) return;

    const payload: UpdateTaskRequest = {
      ...formValue,
      status: formValue.status ?? currentTask.status,
    };

    this.taskApi.updateTask(currentTask.id, payload).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
    });
  }
}

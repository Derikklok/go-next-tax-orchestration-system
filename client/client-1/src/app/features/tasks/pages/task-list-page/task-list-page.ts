import { Component, inject, signal } from '@angular/core';
import { TaskApiService } from '../../services/task-api.service';
import { Task } from '../../models/task.model';
import { RouterLink } from "@angular/router";
import { TaskCard } from "../../components/task-card/task-card";

@Component({
  selector: 'app-task-list-page',
  standalone:true,
  imports: [RouterLink, TaskCard],
  templateUrl: './task-list-page.html',
  styleUrl: './task-list-page.scss',
})
export class TaskListPage {
  private readonly taskApi = inject(TaskApiService);

  // signals for holding data
  tasks = signal<Task[]>([]);
  total = signal(0);

  ngOnInit(): void{
    this.loadTasks();
  }

  private loadTasks():void{
    this.taskApi.getTasks().subscribe({
      next:(response) => {
        this.tasks.set(response.data);
        this.total.set(response.total);
      }
    })
  }

  onDeleteTask(id: number): void {
  const confirmed = confirm('Are you sure you want to delete this task?');

  if (!confirmed) return;

  this.taskApi.deleteTask(id).subscribe({
    next: () => {
      // Remove task locally (no reload)
      this.tasks.update(tasks => tasks.filter(t => t.id !== id));

      // Optional: update total
      this.total.update(total => total - 1);
    }
  });
}
}

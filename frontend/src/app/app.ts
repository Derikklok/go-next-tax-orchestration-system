import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  Header,
  PageContainer,
  Button,
  Input,
  TaskCard,
  TaskService,
  Task,
} from './shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    PageContainer,
    Button,
    Input,
    TaskCard,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Task Manager');
  protected tasks = signal<Task[]>([]);
  protected loading = signal(false);
  protected error = signal('');
  protected showCreateForm = signal(false);

  protected newTask = signal({
    title: '',
    description: '',
  });

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.error.set('');
    
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        this.tasks.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.error.set('Failed to load tasks. Please try again.');
        this.loading.set(false);
      },
    });
  }

  onCreateTask(): void {
    if (!this.newTask().title.trim()) {
      return;
    }

    this.loading.set(true);
    this.taskService
      .createTask({
        title: this.newTask().title,
        description: this.newTask().description,
        status: 'pending',
      })
      .subscribe({
        next: () => {
          this.newTask.set({ title: '', description: '' });
          this.showCreateForm.set(false);
          this.loadTasks();
        },
        error: (err) => {
          console.error('Error creating task:', err);
          this.error.set('Failed to create task. Please try again.');
          this.loading.set(false);
        },
      });
  }

  onUpdateStatus(data: { id: number; status: string }): void {
    this.taskService.updateTask(data.id, { status: data.status as Task['status'] }).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.error.set('Failed to update task status.');
      },
    });
  }

  onDeleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          this.error.set('Failed to delete task.');
        },
      });
    }
  }

  onEditTask(task: Task): void {
    // TODO: Open edit dialog
    console.log('Edit task:', task);
  }
}


import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Task } from '../../models';
import { Card } from '../ui/card/card';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input() task!: Task;

  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();
  @Output() updateStatus = new EventEmitter<{ id: number; status: string }>();

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    if (this.task.id) {
      this.delete.emit(this.task.id);
    }
  }

  onStatusChange(newStatus: 'pending' | 'in-progress' | 'completed'): void {
    if (this.task.id) {
      this.updateStatus.emit({ id: this.task.id, status: newStatus });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'warn';
      case 'in-progress':
        return 'accent';
      case 'completed':
        return 'primary';
      default:
        return 'primary';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending':
        return 'schedule';
      case 'in-progress':
        return 'autorenew';
      case 'completed':
        return 'check_circle';
      default:
        return 'help';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return 'status-default';
    }
  }
}

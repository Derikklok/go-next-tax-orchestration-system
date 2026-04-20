import { Component, EventEmitter, input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  task = input.required<Task>();

  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.task().id);
  }
}

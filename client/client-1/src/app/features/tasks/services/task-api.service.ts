import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  CreateTaskRequest,
  Task,
  TaskListResponse,
  UpdateTaskRequest,
} from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/tasks`;

  // Service Functions

  // Get All Tasks
  getTasks(): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(this.baseUrl);
  }

  // Create a task
  createTask(payload: CreateTaskRequest) {
    return this.http.post<ApiResponse<Task>>(this.baseUrl, payload);
  }

  getTask(id: number) {
    return this.http.get<ApiResponse<Task>>(`${this.baseUrl}/${id}`);
  }

  updateTask(id: number, payload: UpdateTaskRequest) {
    return this.http.put<ApiResponse<Task>>(`${this.baseUrl}/${id}`, payload);
  }

  deleteTask(id: number) {
  return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
}
}

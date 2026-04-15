export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task{
    id : number;
    title: string;
    description:string;
    status:TaskStatus;
}

export interface TaskListResponse{
    data: Task[];
    total:number;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
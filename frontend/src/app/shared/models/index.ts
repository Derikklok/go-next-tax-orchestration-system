// Shared types and interfaces for the application
export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskFilter {
  status?: string;
  searchTerm?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  total?: number;
  error?: string;
}

export interface ButtonConfig {
  label: string;
  color?: 'primary' | 'accent' | 'warn';
  variant?: 'basic' | 'raised' | 'flat' | 'stroked';
  disabled?: boolean;
  icon?: string;
}

export interface DialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

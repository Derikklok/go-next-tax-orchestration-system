import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../api/task.api";
import { TaskInput } from "../schemas/task.schema";
import { Task } from "../types/task.types";

export const taskQueryKeys = {
  all: ["tasks"] as const,
  detail: (id: number) => ["tasks", id] as const,
};

export const useTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.all,
    queryFn: getTasks,
  });
};

export const useTask = (id: number, enabled = true) => {
  return useQuery({
    queryKey: taskQueryKeys.detail(id),
    queryFn: () => getTaskById(id),
    enabled,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskInput) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskInput }) => updateTask(id, data),
    onSuccess: (updatedTask: Task) => {
      queryClient.setQueryData(taskQueryKeys.detail(updatedTask.id), updatedTask);
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};
import { api } from "@/lib/axios";
import { TaskInput } from "../schemas/task.schema";
import { Task } from "../types/task.types";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data.data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const res = await api.get(`/tasks/${id}`);
  return res.data.data;
};

export const createTask = async (data: TaskInput): Promise<Task> => {
  const res = await api.post("/tasks", data);
  return res.data.data;
};

export const updateTask = async (id: number, data: TaskInput): Promise<Task> => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
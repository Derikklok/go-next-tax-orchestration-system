import { api } from "@/lib/axios";
import { Task } from "../types/task.types";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data.data;
};


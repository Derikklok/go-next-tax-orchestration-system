import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;

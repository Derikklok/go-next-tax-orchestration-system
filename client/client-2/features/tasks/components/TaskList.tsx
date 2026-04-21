"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { taskSchema } from "../schemas/task.schema";
import { Task, TaskStatus } from "../types/task.types";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "../hooks/useTasks";

type TaskFormValues = {
  title: string;
  description: string;
  status: TaskStatus;
};

const INITIAL_FORM: TaskFormValues = {
  title: "",
  description: "",
  status: "pending",
};

const STATUS_OPTIONS: TaskStatus[] = ["pending", "in-progress", "completed"];

const STATUS_THEME = {
  pending: {
    container: "bg-amber-50 text-amber-900 ring-amber-200",
    dot: "bg-amber-500",
    icon: Clock3,
  },
  "in-progress": {
    container: "bg-blue-50 text-blue-900 ring-blue-200",
    dot: "bg-blue-500",
    icon: Clock3,
  },
  completed: {
    container: "bg-emerald-50 text-emerald-900 ring-emerald-200",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
} as const;

const formatStatus = (status: TaskStatus) =>
  status.replaceAll("-", " ").replace(/^\w/, (value) => value.toUpperCase());

function StatusCombobox({
  value,
  onChange,
  disabled,
  placeholder,
  itemLabelPrefix,
}: {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
  disabled?: boolean;
  placeholder: string;
  itemLabelPrefix?: string;
}) {
  return (
    <Combobox
      value={value}
      onValueChange={(nextValue) => onChange(nextValue as TaskStatus)}
      disabled={disabled}
    >
      <ComboboxTrigger
        render={
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="h-9 w-full justify-between px-2.5 text-sm font-normal"
          />
        }
      >
        <ComboboxValue placeholder={placeholder} />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No status found.</ComboboxEmpty>
          {STATUS_OPTIONS.map((status) => (
            <ComboboxItem key={status} value={status}>
              {itemLabelPrefix ? `${itemLabelPrefix} ${formatStatus(status)}` : formatStatus(status)}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function TaskList() {
  const [newTask, setNewTask] = useState<TaskFormValues>(INITIAL_FORM);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<TaskFormValues | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [itemError, setItemError] = useState<string | null>(null);

  const { data, isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const tasks = data ?? [];

  const completed = tasks.filter((task) => task.status === "completed").length;
  const inProgress = tasks.filter((task) => task.status === "in-progress").length;
  const pending = tasks.filter((task) => task.status === "pending").length;

  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateError(null);

    const result = taskSchema.safeParse(newTask);
    if (!result.success) {
      setCreateError(result.error.issues[0]?.message ?? "Please check the task details.");
      return;
    }

    try {
      await createTaskMutation.mutateAsync(result.data);
      setNewTask(INITIAL_FORM);
    } catch (mutationError) {
      setCreateError(
        mutationError instanceof Error ? mutationError.message : "Failed to create task."
      );
    }
  };

  const handleStartEdit = (task: Task) => {
    setItemError(null);
    setEditingTaskId(task.id);
    setEditValues({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditValues(null);
    setItemError(null);
  };

  const handleSaveEdit = async (taskId: number) => {
    if (!editValues) {
      return;
    }

    const result = taskSchema.safeParse(editValues);
    if (!result.success) {
      setItemError(result.error.issues[0]?.message ?? "Please check the task details.");
      return;
    }

    setActiveTaskId(taskId);
    setItemError(null);

    try {
      await updateTaskMutation.mutateAsync({ id: taskId, data: result.data });
      setEditingTaskId(null);
      setEditValues(null);
    } catch (mutationError) {
      setItemError(
        mutationError instanceof Error ? mutationError.message : "Failed to update task."
      );
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleDelete = async (taskId: number) => {
    setActiveTaskId(taskId);
    setItemError(null);

    try {
      await deleteTaskMutation.mutateAsync(taskId);
      if (editingTaskId === taskId) {
        handleCancelEdit();
      }
    } catch (mutationError) {
      setItemError(
        mutationError instanceof Error ? mutationError.message : "Failed to delete task."
      );
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleStatusChange = async (task: Task, status: TaskStatus) => {
    if (task.status === status) {
      return;
    }

    setActiveTaskId(task.id);
    setItemError(null);

    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        data: {
          title: task.title,
          description: task.description,
          status,
        },
      });
    } catch (mutationError) {
      setItemError(
        mutationError instanceof Error ? mutationError.message : "Failed to update task status."
      );
    } finally {
      setActiveTaskId(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-border/70 bg-linear-to-br from-card via-card to-muted/20">
        <CardContent className="flex items-center justify-center gap-3 py-12 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          <span>Loading tasks...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader className="gap-2">
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="size-5" />
            Could not load tasks
          </CardTitle>
          <CardDescription>
            {error instanceof Error
              ? error.message
              : "Something went wrong while fetching task data."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(340px,380px)_minmax(0,1fr)]">
      <div className="space-y-6 xl:sticky xl:top-6">
        <Card className="border-border/70 bg-linear-to-br from-card via-card to-muted/10">
          <CardHeader className="gap-1">
            <CardTitle className="text-lg">Create task</CardTitle>
            <CardDescription>Add a new task to your workflow board.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTask} className="grid gap-3">
              <div className="grid grid-cols-1 gap-3">
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(event) =>
                    setNewTask((prev) => ({ ...prev, title: event.target.value }))
                  }
                  disabled={createTaskMutation.isPending}
                />
                <StatusCombobox
                  value={newTask.status}
                  onChange={(status) =>
                    setNewTask((prev) => ({
                      ...prev,
                      status,
                    }))
                  }
                  disabled={createTaskMutation.isPending}
                  placeholder="Select status"
                />
              </div>

              <Textarea
                className="min-h-28"
                placeholder="Task description"
                value={newTask.description}
                onChange={(event) =>
                  setNewTask((prev) => ({ ...prev, description: event.target.value }))
                }
                disabled={createTaskMutation.isPending}
              />

              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-destructive">{createError}</p>
                <Button type="submit" disabled={createTaskMutation.isPending}>
                  {createTaskMutation.isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" />
                      Add Task
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <Card size="sm" className="bg-muted/25">
            <CardContent className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold">{pending}</p>
            </CardContent>
          </Card>
          <Card size="sm" className="bg-muted/25">
            <CardContent className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">In Progress</p>
              <p className="text-2xl font-semibold">{inProgress}</p>
            </CardContent>
          </Card>
          <Card size="sm" className="bg-muted/25">
            <CardContent className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Completed</p>
              <p className="text-2xl font-semibold">{completed}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4 xl:max-h-[calc(100vh-11rem)] xl:overflow-y-auto xl:pr-2">
        {itemError && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="py-4 text-sm text-destructive">{itemError}</CardContent>
          </Card>
        )}

        {tasks.length === 0 ? (
          <Card className="border-dashed border-border/80 bg-linear-to-br from-card via-muted/15 to-card">
            <CardHeader>
              <CardTitle>No tasks yet</CardTitle>
              <CardDescription>
                Create your first task to start planning your work clearly.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
          {tasks.map((task) => {
          const theme = STATUS_THEME[task.status];
          const StatusIcon = theme.icon;
          const isEditing = editingTaskId === task.id && !!editValues;
          const isMutatingThisTask = activeTaskId === task.id;

          return (
            <Card
              key={task.id}
              className="border-border/70 bg-linear-to-br from-card via-card to-muted/10 transition-shadow hover:shadow-md"
            >
              <CardHeader className="gap-3">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editValues.title}
                      onChange={(event) =>
                        setEditValues((prev) =>
                          prev ? { ...prev, title: event.target.value } : prev
                        )
                      }
                      disabled={isMutatingThisTask}
                    />
                    <Textarea
                      className="min-h-24"
                      value={editValues.description}
                      onChange={(event) =>
                        setEditValues((prev) =>
                          prev ? { ...prev, description: event.target.value } : prev
                        )
                      }
                      disabled={isMutatingThisTask}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <StatusCombobox
                        value={editValues.status}
                        onChange={(status) =>
                          setEditValues((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  status,
                                }
                              : prev
                          )
                        }
                        disabled={isMutatingThisTask}
                        placeholder="Select status"
                      />

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(task.id)}
                          disabled={isMutatingThisTask}
                        >
                          {isMutatingThisTask ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Save className="size-4" />
                          )}
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={isMutatingThisTask}
                        >
                          <X className="size-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-lg leading-6">{task.title}</CardTitle>
                        <CardDescription className="max-w-2xl text-sm leading-relaxed">
                          {task.description}
                        </CardDescription>
                      </div>

                      <span
                        className={[
                          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                          theme.container,
                        ].join(" ")}
                      >
                        <span className={["size-1.5 rounded-full", theme.dot].join(" ")} />
                        <StatusIcon className="size-3.5" />
                        {formatStatus(task.status)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <StatusCombobox
                        value={task.status}
                        onChange={(status) => handleStatusChange(task, status)}
                        disabled={isMutatingThisTask}
                        placeholder="Move status"
                        itemLabelPrefix="Move to"
                      />

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStartEdit(task)}
                          disabled={isMutatingThisTask}
                        >
                          <Pencil className="size-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(task.id)}
                          disabled={isMutatingThisTask}
                        >
                          {isMutatingThisTask ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardHeader>
            </Card>
          );
          })}
          </div>
        )}
      </div>
    </div>
  );
}

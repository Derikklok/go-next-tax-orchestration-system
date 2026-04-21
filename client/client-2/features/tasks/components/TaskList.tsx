"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Clock3, Loader2 } from "lucide-react";
import { useTasks } from "../hooks/useTasks";

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

export function TaskList() {
  const { data, isLoading, error } = useTasks();

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

  if (!data || data.length === 0) {
    return (
      <Card className="border-dashed border-border/80 bg-linear-to-br from-card via-muted/15 to-card">
        <CardHeader>
          <CardTitle>No tasks yet</CardTitle>
          <CardDescription>
            Create your first task to start planning your work clearly.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const completed = data.filter((task) => task.status === "completed").length;
  const inProgress = data.filter((task) => task.status === "in-progress").length;
  const pending = data.filter((task) => task.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

      <div className="grid grid-cols-1 gap-4">
        {data.map((task) => {
          const theme = STATUS_THEME[task.status];
          const StatusIcon = theme.icon;

          return (
            <Card
              key={task.id}
              className="border-border/70 bg-linear-to-br from-card via-card to-muted/10 transition-shadow hover:shadow-md"
            >
              <CardHeader className="gap-3">
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
                    {task.status.replace("-", " ")}
                  </span>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

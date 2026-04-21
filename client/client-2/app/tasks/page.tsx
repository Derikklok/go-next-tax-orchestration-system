import { TaskList } from "@/features/tasks/components/TaskList";

const TaskPage = () => {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10">
      <div className="mb-8 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Task List</h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Track planned work, monitor progress, and keep your priorities visible.
        </p>
      </div>

      <TaskList />
    </main>
  );
};

export default TaskPage;

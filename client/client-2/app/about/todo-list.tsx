type Task = {
  id: number;
  title: string;
  description: string;
};

async function getTasks(): Promise<{ data: Task[] }> {
  const res = await fetch("http://localhost:8080/api/tasks");
  return res.json();
}

export default async function TodoList() {
  const { data: tasks } = await getTasks();

  return (
    <div>
      <h1 className="font-bold">Tasks List from fetch api</h1>

      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

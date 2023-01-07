import { useTaskStore } from "../store/taskStore";

interface Task {
  task: string;
  id: string;
  done: boolean;
}

interface TaskProps {
  task: Task;
}

export default function Tasks({ task }: TaskProps) {
  const { deleteTask, toggleTask } = useTaskStore();

  return (
    <div>
      <h1 style={{ color: task.done ? "green" : "red" }}>{task.task}</h1>
      <button onClick={() => deleteTask(task.id)}>Eliminar Tarea</button>
      <button
        style={{ color: task.done ? "green" : "red" }}
        onClick={() => toggleTask(task.id)}
      >
        {task.done ? "Tarea Completa" : "Tarea Incompleta"}
      </button>
    </div>
  );
}

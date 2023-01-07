import create from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  task: string;
  id: string;
  done: boolean;
}

type State = {
  tasks: Task[];
};

type Actions = {
  addTask: (value: Task) => void;
  deleteTask: (value: string) => void;
  toggleTask: (value: string) => void;
  clearStore: () => void;
};

// export const useTaskStore = create<TaskState>((set) => ({
//   tasks: [],

//   addTask: (value: Task) =>
//     set((state) => ({
//       ...state,
//       tasks: [...state.tasks, value],
//     })),
// }));

//persist para guardar en el localstorage
export const useTaskStore = create(
  persist<State & Actions>(
    (set) => ({
      tasks: [],

      addTask: (value: Task) =>
        set((state) => ({
          ...state,
          tasks: [...state.tasks, value],
        })),

      deleteTask: (id: string) =>
        set((state) => ({
          ...state,
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleTask: (id: string) =>
        set((state) => ({
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
          ),
        })),

      clearStore: () => set(() => ({ tasks: [] })),
    }),
    {
      name: "task-zustand",
    }
  )
);

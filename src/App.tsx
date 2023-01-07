import React, { useState } from "react";
import "./App.css";
import Tasks from "./components/Tasks";
import { useTaskStore } from "./store/taskStore";

interface Task {
  task: string;
  id: string;
  done: boolean;
}

interface InputValueState {
  valueInput: Task;
}

const initialValue = {
  task: "",
  id: "",
  done: false,
};

function App() {
  const [valueInput, setValueInput] =
    useState<InputValueState["valueInput"]>(initialValue);
  const { addTask, clearStore, tasks } = useTaskStore();

  const getCurrentTimestamp = () => new Date().getTime().toLocaleString();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (valueInput.task === "") return;

    addTask({ ...valueInput, id: getCurrentTimestamp(), done: false });

    setValueInput(initialValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add task"
          value={valueInput.task}
          name="task"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Enviar</button>
      </form>

      <br />

      <button onClick={() => clearStore()}>Eliminar todo</button>

      {tasks.map((item, index) => (
        <Tasks key={index} task={item} />
      ))}
    </div>
  );
}

export default App;

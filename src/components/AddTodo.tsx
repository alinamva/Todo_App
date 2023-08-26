import { XCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { HomeProps } from "../pages/Home";
import { useState } from "react";

const AddTodo = ({
  setTodoForm,
  setTodos,
}: Pick<HomeProps, "setTodoForm" | "setTodos">) => {
  const [todo, setTodo] = useState("");
  const closeTodoForm = () => {
    setTodoForm(false);
  };
  const handleTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedTodos = localStorage.getItem("todos");
    const newTodos = storedTodos ? JSON.parse(storedTodos) : [];
    newTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
    setTodoForm(false);
  };

  return (
    <motion.form
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      className="w-96 bg-slate-400 absolute p-10 rounded-2xl gap-3 flex flex-col"
      onSubmit={handleTodoSubmit}
    >
      <div onClick={closeTodoForm} className="cursor-pointer justify-end flex">
        <XCircleIcon className="w-6" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-center">
          <h2>Add Todo</h2>
        </div>
        <div className="flex flex-col gap-3">
          <label>
            <input
              type="text"
              placeholder="Brush teeth"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={(e) => setTodo(e.target.value)}
            />
          </label>

          <label>
            <button className="btn btn-primary my-3">ADD</button>
          </label>
        </div>
      </div>
    </motion.form>
  );
};

export default AddTodo;

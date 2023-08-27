import { XCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { HomeProps } from "../pages/Home";
import { useState } from "react";

const EditTodo = ({
  setEditForm,
  setTodos,
  selectedTodo,
  todos,
}: Pick<HomeProps, "setEditForm" | "setTodos" | "selectedTodo" | "todos">) => {
  const handleEditForm = () => {
    setEditForm(false);
  };
  const [todo, setTodo] = useState(todos[selectedTodo] || " ");
  //   console.log(todo);
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedTodos = localStorage.getItem("todos");
    const newTodos = storedTodos ? JSON.parse(storedTodos) : [];
    if (selectedTodo >= 0 && selectedTodo < newTodos.length) {
      newTodos[selectedTodo] = todo;
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
    }

    setEditForm(false);
  };

  return (
    <div className="fixed flex inset-0 bg-black/40  items-center justify-center text-gray-900   ">
      <motion.form
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-96 bg-slate-400 absolute p-10 rounded-2xl gap-3 flex flex-col"
        onSubmit={handleEditSubmit}
      >
        <div
          className="cursor-pointer justify-end flex"
          onClick={handleEditForm}
        >
          <XCircleIcon className="w-6" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-center">
            <h2>Edit Todo</h2>
          </div>
          <div className="flex flex-col gap-3">
            <label>
              <input
                type="text"
                className="input input-bordered input-primary text-gray-100 w-full max-w-xs"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
            </label>

            <label>
              <button className="btn btn-primary my-3">Edit</button>
            </label>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default EditTodo;

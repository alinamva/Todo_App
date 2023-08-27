import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Colors from "../constants/Colors";
import { motion } from "framer-motion";

interface TodoListProps {
  todos: string[];
  handleDeleteTodo: (index: number) => void;
  handleEditTodo: (index: number) => void;
}

const TodoList = ({
  todos,
  handleDeleteTodo,
  handleEditTodo,
}: TodoListProps) => {
  return (
    <div className=" m-auto w-96  gap-5 flex flex-col ">
      <div className="text-center">
        <h2>My Todo List</h2>
      </div>
      <ul className="flex flex-col gap-5">
        {todos.map((todo, index) => {
          const randomColor = Colors[Math.floor(Math.random() * Colors.length)];
          return (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={index}
              className={`h-10 ${randomColor} p-8 flex items-center justify-center rounded-2xl`}
            >
              <li className="flex w-full justify-between">
                <input
                  type="checkbox"
                  className="peer checkbox checkbox-secondary"
                />
                <span className="peer-checked:line-through">{todo}</span>
                <div className="flex gap-3">
                  <div onClick={() => handleDeleteTodo(index)}>
                    <TrashIcon className="w-6 cursor-pointer" />
                  </div>
                  <div onClick={() => handleEditTodo(index)}>
                    <PencilSquareIcon className="w-6" />
                  </div>
                </div>
              </li>
            </motion.div>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;

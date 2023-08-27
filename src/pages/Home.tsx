import wave from "../assets/wave.png";
import quotes from "../constants/Quotes";
import { motion } from "framer-motion";
import {
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import AddTodo from "../components/AddTodo";
import EditTodo from "../components/EditTodo";

export interface HomeProps {
  loginForm: boolean;
  setLoginForm: (loginForm: boolean) => void;
  userName: string;
  setUserName: (userName: string) => void;
  todoForm: boolean;
  setTodoForm: (todoform: boolean) => void;
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
  editForm: boolean;
  setEditForm: (editForm: boolean) => void;
  selectedTodo: number;
  setSelectedTodo: (selectedTodo: number) => void;
}

const Home = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [todoForm, setTodoForm] = useState(false);
  const [todos, setTodos] = useState<string[]>([]);
  const [dropDown, setDropDown] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(-1);

  const handleLoginForm = () => {
    setLoginForm(true);
    setDropDown(false);
  };
  const [randomQuote, setRandomQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    const interval = setInterval(() => {
      const newRandomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setRandomQuote(newRandomQuote);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("userName");
    setUserName("");
    localStorage.removeItem("todos");
    setTodos([]);
  };
  const handleTodoForm = () => {
    setTodoForm(true);
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleDropDown = () => {
    setDropDown((showDropDown) => !showDropDown);
  };
  const handleEditTodo = (index: number) => {
    setSelectedTodo(index);
    setEditForm(true);
  };

  return (
    <div className=" flex flex-col gap-5">
      <header className="flex justify-between px-8">
        <div className="w-[30%] text-center  gap-4 flex flex-col">
          <div className="flex items-center justify-center gap-4 w-full">
            <img src={wave} className="w-10" alt=" " />
            {userName ? (
              <h2 className="font-semibold text-4xl">Good day, {userName}</h2>
            ) : (
              <h2 className="font-semibold text-4xl">Good day!</h2>
            )}
          </div>
          <motion.p
            key={randomQuote}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="italic"
          >
            {randomQuote}
          </motion.p>{" "}
        </div>
        <div onClick={handleDropDown}>
          <UserCircleIcon className="w-24 h-24 cursor-pointer hover:text-white duration-150 text-gray-400" />
        </div>
        {dropDown && (
          <div className="w-40 p-6 bg-slate-100 absolute text-indigo-950 rounded-2xl left-[85.3%] top-36">
            <ul className="gap-3 flex flex-col">
              <li onClick={handleLoginForm}>
                <UserIcon className="w-6" />
                Profile
              </li>

              {userName && (
                <li className="text-red-500" onClick={handleLogOut}>
                  <ArrowRightOnRectangleIcon className="w-6" />
                  Logout
                </li>
              )}
            </ul>
          </div>
        )}
      </header>
      {loginForm && (
        <div className="fixed flex inset-0 bg-black/40  items-center justify-center">
          <Login setLoginForm={setLoginForm} setUserName={setUserName} />
        </div>
      )}
      {todoForm && (
        <div className="fixed flex inset-0 bg-black/40  items-center justify-center">
          <AddTodo setTodoForm={setTodoForm} setTodos={setTodos} />
        </div>
      )}
      {editForm && (
        <div className="fixed flex inset-0 bg-black/40  items-center justify-center">
          <EditTodo
            setEditForm={setEditForm}
            setTodos={setTodos}
            selectedTodo={selectedTodo}
            todos={todos}
          />
        </div>
      )}
      <div className="m-auto w-96  gap-5 flex flex-col text-center ">
        {todos.length == 0 && userName ? (
          <h2>You dont have any todos!</h2>
        ) : todos.length !== 0 && userName ? (
          <div></div>
        ) : (
          <h2>Enter to your profile first!</h2>
        )}
      </div>
      {todos && todos.length !== 0 && (
        <div className=" m-auto w-96  gap-5 flex flex-col ">
          <div className="text-center">
            <h2>My Todo List</h2>
          </div>
          <ul className="flex flex-col gap-3">
            {todos.map((todo, index) => (
              <li key={index} className="flex w-full justify-between">
                <span>{todo}</span>
                <div className="flex gap-2">
                  <div onClick={() => handleDeleteTodo(index)}>
                    <TrashIcon className="w-6 cursor-pointer" />
                  </div>
                  <div onClick={() => handleEditTodo(index)}>
                    <PencilSquareIcon className="w-6" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="fixed left-3/4 top-3/4" onClick={handleTodoForm}>
        <button className="btn btn-circle w-16 h-16 btn-outline text-3xl btn-secondary">
          +
        </button>
      </div>
    </div>
  );
};

export default Home;

import wave from "../assets/wave.png";
import quotes from "../constants/Quotes";
import { motion } from "framer-motion";
import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import AddTodo from "../components/AddTodo";

export interface HomeProps {
  loginForm: boolean;
  setLoginForm: (loginForm: boolean) => void;
  userName: string;
  setUserName: (userName: string) => void;
  todoForm: boolean;
  setTodoForm: (todoform: boolean) => void;
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
}

const Home = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [todoForm, setTodoForm] = useState(false);
  const [todos, setTodos] = useState<string[]>([]);

  const handleLoginForm = () => {
    setLoginForm(true);
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
  };
  const handleTodoForm = () => {
    setTodoForm(true);
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
        {userName && <h2 onClick={handleLogOut}>Logout</h2>}
        <div onClick={handleLoginForm}>
          <UserCircleIcon className="w-24 h-24 cursor-pointer hover:text-white duration-150 text-gray-400" />
        </div>
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
      {todos.length == 0 && <div>You dont have any todo</div>}

      {todos && (
        <div className=" m-auto w-96  gap-5 flex flex-col ">
          <div className="text-center">
            <h2>My Todo List</h2>
          </div>
          <ul className="flex flex-col gap-3">
            {todos.map((todo, index) => (
              <li key={index} className="flex w-full justify-between">
                <span>{todo}</span>
                <TrashIcon className="w-6 cursor-pointer" />
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

import { XCircleIcon } from "@heroicons/react/24/solid";
import { HomeProps } from "../pages/Home";
import { motion } from "framer-motion";
import { useState } from "react";

const Login = ({
  setLoginForm,
  setUserName,
}: Pick<HomeProps, "setLoginForm" | "setUserName">) => {
  const closeLoginForm = () => {
    setLoginForm(false);
  };
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    setUserName(name);
    setLoginForm(false);
  };

  return (
    <div className="fixed flex inset-0 bg-black/40  items-center justify-center text-gray-900">
      <motion.form
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-96 bg-slate-400 absolute p-10 rounded-2xl gap-3 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div
          onClick={closeLoginForm}
          className="cursor-pointer justify-end flex"
        >
          <XCircleIcon className="w-6" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-center">
            <h2>Enter Your Name</h2>
          </div>
          <div className="flex flex-col gap-3">
            <label>
              <input
                type="text"
                placeholder="Alina"
                className="input input-bordered input-primary w-full max-w-xs text-gray-100"
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <button className="btn btn-primary my-3">SUBMIT</button>
            </label>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;

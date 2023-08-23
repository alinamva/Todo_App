import wave from "../assets/wave.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const quotes = [
  "“Focus on being productive instead of busy.”",
  "“Do the hard jobs first. The easy jobs will take care of themselves.”",
  "Productivity is being able to do things that you were never able to do before.”",
  "“It’s not always that we need to do more but rather that we need to focus on less.”",
  " “My goal is no longer to get more done, but rather to have less to do.”",
  "“You can fool everyone else, but you can’t fool your own mind.”",
  "“You miss 100% of the shots you don’t take.”",
  "“Simplicity boils down to two steps: Identify the essential. Eliminate the rest.”",
];
const Home = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="h-full flex flex-col gap-5">
      <header className="flex justify-between px-8">
        <div className="w-1/4 text-center  gap-4 flex flex-col">
          <div className="flex items-center justify-center gap-4 w-full">
            <img src={wave} className="w-10" alt=" " />
            <h2 className="font-semibold text-4xl">Good day!</h2>
          </div>
          <p className="italic">{randomQuote}</p>
        </div>
        <div>
          <UserCircleIcon className="w-24 h-24 cursor-pointer hover:text-white duration-150 text-gray-400" />
        </div>
      </header>
      <div className=" m-auto w-96  gap-5 flex flex-col ">
        <ul className="gap-4 flex flex-col"></ul>{" "}
      </div>{" "}
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const oneHourInMs = 60 * 60 * 1000;
  const [count, setCount] = useState(0 * 60 * 1000);
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (count === oneHourInMs) {
      stopCount();
      resetCount();
    }
  }, [count]);

  const startCount = () => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 10);
    }, 10);
    setTimer(interval);
    setIsRunning(true);
  };

  const stopCount = () => {
    clearInterval(timer);
    setIsRunning(false);
  };

  const resetCount = () => {
    setCount(0);
  };

  const showTime = (miliseconds: number) => {
    const formattedMs = (miliseconds % 1000)
      .toString()
      .padStart(2, "0")
      .slice(0, 2);
    const seconds = Math.floor(miliseconds / 1000);
    const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = (minutes % 60).toString().padStart(2, "0");

    return (
      <>
        {formattedMinutes} <span>:</span> {formattedSeconds} <span>:</span>{" "}
        {formattedMs}
      </>
    );
  };

  return (
    <div className="container mx-auto pt-8 text-sky-300 text-8xl static">
      <div className="pt-80 pb-20 flex justify-center items-center">
        {showTime(count)}
      </div>
      <div id="buttons" className="py-8 mt-2 text-center static">
        {isRunning ? (
          <button
            className="relative px-12 w-80 h-80 right-8"
            onClick={stopCount}
          >
            <i className="bi bi-stopwatch text-9xl inline-block absolute top-24 left-[100px]"></i>
          </button>
        ) : (
          <button
            className="relative px-12 w-80 h-80 right-8"
            onClick={startCount}
          >
            <i className="bi bi-stopwatch-fill text-9xl inline-block absolute top-24 left-[100px]"></i>
          </button>
        )}
        <button
          className="relative px-12 w-80 h-80 left-8"
          onClick={resetCount}
        >
          <i className="bi bi-arrow-clockwise text-9xl inline-block absolute top-[100px] left-[100px]"></i>
        </button>
      </div>
    </div>
  );
}

export default App;

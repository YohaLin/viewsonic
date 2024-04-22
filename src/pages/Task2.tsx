import { useRef, useState } from "react";
import Button from "../components/Button";

const Task2 = () => {
  const [now, setNow] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [lastLapTime, setLastLapTime] = useState(0);
  const [lapList, setLapList] = useState<number[]>([]);
  const [mode, setMode] = useState<"start" | "end">("end");
  const intervalRef = useRef<number>(0); // when change state, don't re-render (return id)

  const handleStart = () => {
    setLapList([]);
    setStartTime(Date.now());
    setNow(Date.now());

    // clean last interval id
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10) as unknown as number;

    setMode("start");
  };

  const handleEnd = () => {
    clearInterval(intervalRef.current);
    setMode("end");
  };

  const handleLap = () => {
    const current = Date.now();
    const lapTime = current - lastLapTime;

    if (lapList.length === 0) {
      // lap 1
      setLapList(() => [passedSeconds]);
    } else {
      // lap 2, 3....
      setLapList((prevLaps) => [...prevLaps, lapTime]);
    }

    setLastLapTime(current);
  };

  let passedSeconds = 0;
  if (startTime !== 0 && now !== 0) {
    passedSeconds = now - startTime;
  }

  return (
    <div className="w-full md:w-[600px] h-fit p-4 m-auto border-2 border-red-500 rounded-lg">
      {/* timer */}
      <div className="flex justify-center items-center w-full h-[200px] rounded-lg bg-[#C86B6B]">
        <p className="text-[100px] text-white">
          {(passedSeconds / 1000).toFixed(3)}
        </p>
      </div>

      {/* buttons */}
      <div className="flex justify-between w-full h-[120px] px-8 py-4">
        <Button
          style="w-20 h-20 rounded-full border"
          text="Lap"
          disabled={mode === "end"}
          onClick={() => handleLap()}
        />
        {mode === "end" && (
          <Button
            style="w-20 h-20 rounded-full border"
            text="Start"
            onClick={() => handleStart()}
          />
        )}
        {mode === "start" && (
          <Button
            style="w-20 h-20 rounded-full border"
            text="End"
            onClick={() => handleEnd()}
          />
        )}
      </div>

      {/* lap list */}
      <div className="w-full h-fit border-t border-red-500">
        {lapList
          .map((lapTime, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-3/4 h-12 m-auto border-b border-red-500"
            >
              <span>lap {index + 1}</span>
              <span className="">{(lapTime / 1000).toFixed(3)}</span>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default Task2;

import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import clsx from "clsx";
import { buttonStyle } from "../styles/buttonStyle";
import useScreenWidth from "../hooks/useScreenWidth";

const Task1 = () => {
  // toggle state in textarea
  const [isEditable, setIsEditable] = useState<boolean>(true);
  // frame width changes
  const [frameWidth, setFrameWidth] = useState<400 | 800>(400);
  const [textLength, setTextLength] = useState(0)
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const screenWidth = useScreenWidth()

  // get textarea scrollHeight and text length
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaHeight(`${e.target.scrollHeight}px`);
    setTextLength(e.target.textLength)
  }

  // when screen width < 996, change frameWidth to 400, avoid broken layout
  useEffect(() => {
    if (window.innerWidth < 996) {
      setFrameWidth(400);
    }
  }, [screenWidth]);

  return (
    <div
      className={clsx("flex gap-4 h-fit m-auto p-4 border-2 border-red-500 rounded-lg", {
        "w-[400px]": frameWidth === 400,
        "w-[800px]": frameWidth === 800,
      })}
    >
      <div className="flex flex-col w-full h-full">
        <textarea
          name="textarea"
          className={clsx("p-3 rounded-lg", buttonStyle)}
          style={{height: textareaHeight}} // automatically change height according to text
          disabled={!isEditable}
          placeholder="write something..."
          onChange={handleTextareaChange}
        ></textarea>
        <p className="w-full text-end">已輸入 {textLength} 字</p>
      </div>

      <div className="flex flex-col gap-4 w-fit h-fit">
        <Button
          style="w-fit h-12 px-4 py-2 rounded-lg"
          text={isEditable ? "disable edit" : "edit"}
          onClick={() => setIsEditable(!isEditable)}
        />
        <Button
          style="w-fit min-w-[150px] h-12 p-2 rounded-lg"
          text={`resize to ${frameWidth === 400 ? 800 : 400}px`}
          disabled={frameWidth === 400 && screenWidth < 996}
          onClick={() =>
            frameWidth === 400 && screenWidth > 996 ? setFrameWidth(800) : setFrameWidth(400)
          }
        />
      </div>
    </div>
  );
};

export default Task1;

import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import { buttonStyle } from "../styles/buttonStyle";
import useScreenWidth from "../hooks/useScreenWidth";
import useAutoSizedTextarea from "../hooks/useAutoSizedTextarea";
import BREAK_POINT from "../constants";
import clsx from "clsx";

const Task1 = () => {
  const isDesktop = window.innerWidth > BREAK_POINT;
  // toggle state in textarea
  const [isEditable, setIsEditable] = useState<boolean>(true);
  // frame width changes
  const [frameWidth, setFrameWidth] = useState<400 | 800>(400);
  const [textLength, setTextLength] = useState(0);
  const screenWidth = useScreenWidth();
  // create ref to prevent re-render when typing
  const textareaRef = useAutoSizedTextarea();

  // get textarea scrollHeight and text length
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextLength(e.target.textLength);
  };

  // when screen width < 997, change frameWidth to 400, avoid broken layout
  useEffect(() => {
    if (!isDesktop) {
      setFrameWidth(400);
    }
  }, [screenWidth]);

  return (
    <div
      className={clsx(
        "flex gap-4 h-fit m-auto p-4 border-2 border-red-500 rounded-lg",
        {
          "w-[400px]": frameWidth === 400,
          "w-[800px]": frameWidth === 800,
        }
      )}
    >
      <div className="flex flex-col w-full h-full">
        <textarea
          ref={textareaRef}
          name="textarea"
          className={clsx("p-3 rounded-lg", buttonStyle)}
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
          disabled={frameWidth === 400 && !isDesktop}
          onClick={() =>
            frameWidth === 400 && isDesktop
              ? setFrameWidth(800)
              : setFrameWidth(400)
          }
        />
      </div>
    </div>
  );
};

export default Task1;

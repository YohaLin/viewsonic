import clsx from "clsx";
import React from "react";
import { buttonStyle } from "../styles/buttonStyle";

const Button: React.FC<{
  style: string;
  text: string;
  disabled?: boolean
  onClick: () => void;
}> = ({ style, text, disabled, onClick }) => {
  return (
    <button
      className={clsx(
        style,
        buttonStyle
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

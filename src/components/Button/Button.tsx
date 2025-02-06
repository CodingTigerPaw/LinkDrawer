import React from "react";
import { twMerge } from "tailwind-merge";
import { ButtonType } from "$/app/types/ButttonType";

const Button = ({
  primary,
  secondary,
  cancel,
  type = "button",
  children,
  onClick,
  className,
}: ButtonType) => {
  return (
    <button
      type={type}
      onMouseDown={onClick}
      className={twMerge(
        primary && "bg-purple-600 text-white p-2 rounded-md",
        secondary &&
          "rounded-md border border-[#d0d5dd] p-[10px] text-[#6941C6] font-bold",
        cancel && "text-red-600",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

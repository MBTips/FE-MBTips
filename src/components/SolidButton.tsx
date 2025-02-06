import { MouseEvent } from "react";

interface SolidButtonProps {
  size: "sm" | "md";
  text: string;
  backgroundColor: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SolidButton = ({
  size = "sm",
  text,
  backgroundColor = "#5C4AE8",
  disabled = false,
  onClick
}: SolidButtonProps) => {
  return (
    <button
      className={
        `flex justify-center items-center rounded-lg font-bold text-lg bg-[${backgroundColor}]` +
        `${size === "sm" ? "w-[159px] h-[60px]" : "w-[335px] h-[56px]"}`
      }
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SolidButton;

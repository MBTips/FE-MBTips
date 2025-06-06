import { MouseEvent } from "react";

interface PrimaryButtonProps {
  size: "sm" | "md";
  children: string;
  backgroundColor?: "#5C4AE8" | "#F9E622" | "#E6E8ED";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton = ({
  size = "sm",
  backgroundColor = "#5C4AE8",
  disabled = false,
  children,
  onClick
}: PrimaryButtonProps) => {
  return (
    <button
      className={
        "flex justify-center items-center rounded-lg font-bold text-lg hover:opacity-90 transition " +
        `${size === "sm" ? "w-[159px] h-[60px]" : "w-[335px] h-[56px]"}` +
        `${backgroundColor === "#5C4AE8" ? " text-white" : " text-[#171503]"}`
      }
      style={{ backgroundColor: disabled ? "#848C96" : backgroundColor }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

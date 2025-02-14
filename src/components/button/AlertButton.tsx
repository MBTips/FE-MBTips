import { MouseEvent } from "react";
import { cls } from "@/utils/cls";

interface AlertButtonProps {
  children: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
const AlertButton = ({ children, onClick }: AlertButtonProps) => {
  return (
    <button
      className={cls(
        "flex justify-center items-center rounded-lg w-[124px] h-[44px] font-medium text-xl",
        children === "확인"
          ? "bg-primary-normal text-white"
          : "bg-gray-100 text-gray-900"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AlertButton;

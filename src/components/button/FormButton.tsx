import { MouseEvent } from "react";

interface FormButtonProps {
  size: "sm" | "md";
  children: string;
  selected?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FormButton = ({
  size = "sm",
  selected = false,
  children,
  onClick
}: FormButtonProps) => {
  const baseStyles = "flex justify-center items-center rounded-lg transition";

  const sizeStyles =
    size === "sm" ? "min-w-[68px] w-auto h-[40px]" : "w-[72px] h-[72px]";

  const fontSize =
    size === "md"
      ? "text-[var(--text-2xl)]"
      : selected
        ? "text-[16px]"
        : "text-[14px]";

  const fontWeight =
    size === "md" ? "font-bold" : selected ? "font-bold" : "font-medium";

  const backgroundColor = selected ? "bg-primary-pale" : "bg-white";
  const borderColor = selected ? "border-primary-light" : "border-gray-200";
  const fontColor = selected ? "text-primary-normal" : "text-gray-900";

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${fontSize} ${fontWeight} ${backgroundColor} ${borderColor} ${fontColor} border`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default FormButton;

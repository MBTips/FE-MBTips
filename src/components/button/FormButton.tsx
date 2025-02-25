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

  const backgroundColor = selected ? "var(--color-primary-pale)" : "#FFFFFF";

  const borderColor = selected
    ? "var(--color-primary-light)"
    : "var(--color-gray-200)";

  const fontColor = selected
    ? "var(--color-primary-normal)"
    : "var(--color-gray-900)";

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${fontSize} ${fontWeight}`}
      style={{
        backgroundColor,
        border: `1px solid ${borderColor}`,
        color: fontColor
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default FormButton;

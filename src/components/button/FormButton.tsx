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
  const baseStyles =
    "flex justify-center items-center rounded-lg transition-colors transform-none focus:transform-none active:transform-none select-none";

  const sizeStyles =
    size === "sm" ? "min-w-[68px] w-auto h-[40px]" : "w-[70px] h-[72px]";

  const getFontSize = () => {
    if (size === "md") return "text-[var(--text-2xl)]";

    // 긴 텍스트인 경우 작은 폰트 적용
    const isLongText = children.length > 4;

    if (selected) {
      return isLongText ? "text-[13px]" : "text-[16px]";
    } else {
      return isLongText ? "text-[12px]" : "text-[14px]";
    }
  };

  const fontSize = getFontSize();

  const fontWeight =
    size === "md" ? "font-bold" : selected ? "font-bold" : "font-medium";

  const backgroundColor = selected ? "bg-primary-pale" : "bg-white";
  const borderColor = selected ? "border-primary-light" : "border-gray-200";
  const fontColor = selected ? "text-primary-normal" : "text-gray-900";

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${fontSize} ${fontWeight} ${backgroundColor} ${borderColor} ${fontColor} border leading-none`}
      onClick={onClick}
      style={{ lineHeight: "1" }}
    >
      {children}
    </button>
  );
};
export default FormButton;

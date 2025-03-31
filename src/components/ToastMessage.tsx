import { useEffect } from "react";

interface ToastMessageProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const ToastMessage = ({
  message,
  duration = 3000,
  onClose
}: ToastMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-[108px] left-1/2 flex h-[52px] w-full max-w-[320px] -translate-x-1/2 items-center justify-center rounded-[12px] bg-black text-center text-[16px] leading-[24px] font-medium tracking-[0%] text-white">
      {message}
    </div>
  );
};

export default ToastMessage;

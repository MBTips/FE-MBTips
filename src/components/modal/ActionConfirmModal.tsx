import AlertButton from "@/components/button/AlertButton";

type AlertProps = {
  title: string;
  message: string[];
  cancelText: string;
  confirmText: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const ActionConfirmModal = ({
  title,
  message,
  cancelText,
  confirmText,
  onCancel,
  onConfirm
}: AlertProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div
        className="flex h-[200px] w-[294px] flex-col items-center justify-center rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-[9px] text-center text-xl font-medium whitespace-pre-wrap">
          {message.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </p>
        <div className="mt-[19px] flex gap-3.5">
          <AlertButton onClick={onCancel}>{cancelText}</AlertButton>
          <AlertButton onClick={onConfirm}>{confirmText}</AlertButton>
        </div>
      </div>
    </div>
  );
};

export default ActionConfirmModal;

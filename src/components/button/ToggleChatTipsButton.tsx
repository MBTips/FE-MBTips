interface ToggleChatTipsButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ToggleChatTipsButton = ({
  isOpen,
  setIsOpen
}: ToggleChatTipsButtonProps) => {
  return (
    <button>
      <img
        src={isOpen ? "/icon/close.svg" : "/icon/plus.svg"}
        onClick={() => setIsOpen(!isOpen)}
        alt="토글 메뉴 버튼"
        width={14}
        height={14}
      />
    </button>
  );
};

export default ToggleChatTipsButton;

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useMbtiTestState from "@/store/useMbtiTestState";
import ActionConfirmModal from "@/components/modal/ActionConfirmModal";
import ShareModal from "@/components/modal/ShareModal";

type SubHeaderProps = {
  title: string;
  showPreviousIcon?: boolean;
  showShareIcon?: boolean;
};

const SubHeader = ({
  title = "",
  showPreviousIcon = true,
  showShareIcon = true
}: SubHeaderProps) => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { currentPage, setPreviousStep } = useMbtiTestState();
  const [isLeaveChatModalOpen, setIsLeaveChatModalOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const isProgressPage = pathname === "/mbti-test-progress";
  const isChatPage = pathname === "/chat";
  const isFirstQuestionPage = currentPage === 1;
  const mode = state?.mode;
  const chatId = state?.id;

  const handleGoBack = () => {
    if (isProgressPage && !isFirstQuestionPage) {
      setPreviousStep();
      return;
    }

    if (isChatPage) {
      return mode === "fastFriend"
        ? setIsLeaveChatModalOpen(true)
        : navigate("/");
    }

    if (isFirstQuestionPage) {
      navigate(-1);
    }
  };

  const handleCancel = () => setIsLeaveChatModalOpen(false);

  const handleConfirm = () => {
    if (chatId) {
      sessionStorage.removeItem(`chatMessages_${chatId}`);
    }

    setIsLeaveChatModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="relative flex h-[56px] w-full items-center justify-between border-b border-gray-100 bg-white">
        {showPreviousIcon && (
          <img
            src="/public/icon/arrow_left.svg"
            alt="Go To Back"
            className="absolute left-4 cursor-pointer"
            width={9}
            height={16}
            onClick={handleGoBack}
          />
        )}

        <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-gray-900">
          {title}
        </h1>

        {showShareIcon && (
          <button
            onClick={() => setShareModalIsOpen(true)}
            className="absolute right-4"
          >
            <img
              src="/public/icon/share.svg"
              alt="Share"
              width={16}
              height={16}
            />
          </button>
        )}
      </header>

      {isLeaveChatModalOpen && (
        <ActionConfirmModal
          title="채팅방 나가기"
          message={["대화가 저장 되지않아요", "정말 나갈까요?"]}
          cancelText="취소"
          confirmText="확인"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}

      {shareModalIsOpen && (
        <ShareModal
          closeModal={() => {
            setShareModalIsOpen(false);
          }}
        />
      )}
    </>
  );
};

export default SubHeader;

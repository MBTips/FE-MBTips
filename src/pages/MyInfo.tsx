import Header from "@/components/header/Header";
import { useState } from "react";
import ActionConfirmModal from "@/components/modal/ActionConfirmModal";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import TermsAndPrivacyModal from "@/components/modal/TermsAndPrivacyModal";
import { trackEvent } from "@/libs/analytics";
import { deleteUser } from "@/api/user";
import Error from "@/pages/Error";

type ModalType = "logout" | "withdraw" | "terms" | "privacy" | null;

const alertConfig = {
  logout: {
    title: "로그아웃",
    message: ["로그아웃 할까요?"],
    cancelText: "취소",
    confirmText: "확인"
  },
  withdraw: {
    title: "회원탈퇴",
    message: ["정말 탈퇴하시겠습니까?"],
    cancelText: "취소",
    confirmText: "확인"
  }
};

const MyInfo = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const { logout, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleCancel = () => {
    setModalType(null);
  };

  const handleConfirm = async () => {
    if (modalType === "logout") {
      trackEvent("Click", {
        page: "내 정보",
        element: "로그아웃"
      });
      logout();
      navigate("/login");
    } else if (modalType === "withdraw") {
      trackEvent("Click", {
        page: "내 정보",
        element: "회원탈퇴"
      });

      try {
        await deleteUser();
        logout();
        navigate("/");
      } catch (error) {
        console.error(error);
        navigate("/error");
      }
    }
    setModalType(null);
  };

  const menuItems = [
    { label: "이용약관", onClick: () => setModalType("terms") },
    { label: "개인정보처리방침", onClick: () => setModalType("privacy") },
    { label: "로그아웃", onClick: () => setModalType("logout") },
    { label: "회원탈퇴", onClick: () => setModalType("withdraw") }
  ];

  if (!isLoggedIn) {
    return <Error statusCode="401" />;
  }

  return (
    <div className="relative flex w-full flex-col bg-white lg:w-[500px]">
      <Header title="내 정보" showShareIcon={false} />

      <ul className="mt-[10px] flex flex-col justify-between gap-[20px]">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex h-[56px] cursor-pointer items-center justify-between px-5 py-4 hover:bg-gray-50"
            onClick={item.onClick}
          >
            <span className="text-base font-medium text-gray-900">
              {item.label}
            </span>
            <img
              src="/icon/arrow_right.svg"
              alt="arrow"
              className="h-6 w-6 text-gray-600"
            />
          </li>
        ))}
      </ul>

      {modalType && (modalType === "logout" || modalType === "withdraw") && (
        <ActionConfirmModal
          title={alertConfig[modalType].title}
          message={alertConfig[modalType].message}
          cancelText={alertConfig[modalType].cancelText}
          confirmText={alertConfig[modalType].confirmText}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}

      {modalType && (modalType === "terms" || modalType === "privacy") && (
        <TermsAndPrivacyModal mode={modalType} closeModal={handleCancel} />
      )}
    </div>
  );
};

export default MyInfo;

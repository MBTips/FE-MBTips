
import Header from "@/components/header/Header";
import { useState } from "react";
import ActionConfirmModal from "@/components/modal/ActionConfirmModal";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

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
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleCancel = () => {
    setModalType(null);
  };

  const handleConfirm = () => {
    if (modalType === "logout") {
      logout();
      navigate("/login");
    } else if (modalType === "withdraw") {
      console.log("회원탈퇴 실행"); //TODO: 회원탈퇴 기능 구현 시 추가 필요
    }
    setModalType(null);
  };

  const menuItems = [
    { label: "이용약관", onClick: () => setModalType("terms") }, //TODO: 이용약관 팝업 구현 시 추가 필요
    { label: "개인정보처리방침", onClick: () => setModalType("privacy") }, //TODO: 개인정보처리방침 팝업 구현 시 추가 필요
    { label: "로그아웃", onClick: () => setModalType("logout") },
    { label: "회원탈퇴", onClick: () => setModalType("withdraw") }
  ];

  return (
    <div className="relative flex w-[360px] flex-col bg-white md:w-[375px] lg:w-[500px]">
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
    </div>
  );
};

export default MyInfo;

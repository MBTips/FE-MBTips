import AlertButton from "@/components/button/AlertButton";

const Alert = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl w-[294px] h-[200px]">
        <h3 className="font-bold text-2xl">채팅방 나가기</h3>
        <p className="mt-[9px] font-medium text-xl">
          <span>대화가 저장되지 않아요.</span>
          <span className="flex justify-center">정말 나갈까요?</span>
        </p>
        <div className="flex gap-3.5 mt-[19px]">
          <AlertButton>취소</AlertButton>
          <AlertButton>확인</AlertButton>
        </div>
      </div>
    </>
  );
};

export default Alert;

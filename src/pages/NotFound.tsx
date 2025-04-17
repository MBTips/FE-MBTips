import PrimaryButton from "@/components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <main className="relative flex flex-col items-center  bg-white">
      <div className="absolute bottom-[372px] flex h-[196px] flex-col items-center justify-between">
        <img
          src="/icon/error.svg"
          alt="404 페이지 아이콘"
          width={63}
          height={63}
        />
        <h1 className="text-2xl font-bold ">페이지를 찾을 수 없습니다.</h1>
        <p className=" text-center text-gray-600">
          입력하신 주소가 올바르지 않거나,
          <br />
          요청하신 페이지가 삭제되었을 수 있습니다.
        </p>
      </div>
      <div className="absolute bottom-[60px]">
        <PrimaryButton size="md" onClick={goHome}>
          홈으로 가기
        </PrimaryButton>
      </div>
    </main>
  );
};

export default NotFound;

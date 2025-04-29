import { Link, useNavigate } from "react-router-dom";
import LoginButton from "@/components/button/LoginButton";
import trackClickEvent from "@/utils/trackClickEvent";

const MainHeader = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    trackClickEvent("홈", "내정보");
    navigate("/my-info");
  };

  return (
    <header className="flex h-[56px] w-full items-center justify-between bg-white px-5">
      <Link to="/" className="flex items-center">
        <img
          src="/public/icon/mbtipslogo.svg"
          alt="Logo"
          width={110}
          height={31}
        />
      </Link>
      {!isLoggedIn ? (
        <LoginButton />
      ) : (
        <img
          src="/public/icon/people.svg"
          alt="Login Done"
          className="mx-auto mr-[20px] cursor-pointer"
          width={24}
          height={24}
          onClick={handleNavigate}
        />
      )}
    </header>
  );
};

export default MainHeader;

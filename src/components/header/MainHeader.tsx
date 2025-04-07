import { Link } from "react-router-dom";
import LoginButton from "../button/LoginButton";

const MainHeader = ({isLoggedIn}: {isLoggedIn : string | null})=> {
  return (
    <div className="bg-white flex h-[56px] w-full justify-between px-5">
      <Link to="/" className="flex items-center">
      <img
        src="/public/icon/mbtipslogo.svg"
        alt="Logo"
        width={110}
        height={31}
      />
      </Link>
      {isLoggedIn === "true" ? <LoginButton/> : <img
        src="/public/icon/people.svg"
        alt="Login Done"
        className="mx-auto mr-[20px]"
        width={24}
        height={24}
      />}
    </div>)
}

export default MainHeader;
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-white flex h-[56px] w-full justify-between">
      <Link to="/" className="flex items-center">
      <img
        src="/public/icon/mbtipslogo.svg"
        alt="Logo"
        className="ml-[20px]"
        width={110}
        height={31}
      />
      </Link>
      <img
        src="/public/icon/people.svg"
        alt="Login Done"
        className="mx-auto mr-[20px]"
        width={24}
        height={24}
      />
    </div>
  );
};

export default NavBar;

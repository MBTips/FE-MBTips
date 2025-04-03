import LoginButton from "@/components/button/LoginButton";

const NavBar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="flex h-[62px] w-full justify-between items-center px-5">
      <img
        src="/public/icon/mbtipslogo.svg"
        alt="Logo"
        width={110}
        height={31}
      />

      {isLoggedIn === "true" ? <LoginButton/> : <img
        src="/public/icon/people.svg"
        alt="Login Done"
        className="mx-auto mr-[20px]"
        width={24}
        height={24}
      />}
    </div>
  );
};

export default NavBar;

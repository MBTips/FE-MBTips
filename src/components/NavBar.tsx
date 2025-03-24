const NavBar = () => {
  return (
    <div className="flex h-[56px] w-full justify-between">
      <img
        src="/public/icon/mbtipslogo.svg"
        alt="Logo"
        className="ml-[20px]"
        width={110}
        height={31}
      />

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

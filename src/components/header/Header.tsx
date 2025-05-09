import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import SubHeader from "@/components/header/SubHeader";
import MainHeader from "@/components/header/MainHeader";
import useAuthStore from "@/store/useAuthStore";

type HeaderProps = {
  title?: string;
  showPreviousIcon?: boolean;
  showShareIcon?: boolean;
  children?: ReactNode;
};

const Header = ({
  title = "",
  showPreviousIcon = true,
  showShareIcon = true,
  children
}: HeaderProps) => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuthStore();
  const isHomepage = pathname === "/";

  return (
    <>
      <header className="fixed z-50 w-full bg-white lg:w-[500px]">
        {isHomepage ? (
          <MainHeader isLoggedIn={isLoggedIn} />
        ) : (
          <SubHeader
            title={title}
            showPreviousIcon={showPreviousIcon}
            showShareIcon={showShareIcon}
          />
        )}
      </header>

      {children && <div className="pt-14">{children}</div>}
    </>
  );
};

export default Header;

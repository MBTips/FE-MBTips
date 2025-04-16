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
  showShareIcon = false,
  children
}: HeaderProps) => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuthStore();
  const isHomepage = pathname === "/";

  return (
    <>
      <div className="fixed z-50 w-[360px] bg-white md:w-[375px] lg:w-[500px]">
        {isHomepage ? (
          <MainHeader isLoggedIn={isLoggedIn} />
        ) : (
          <SubHeader
            title={title}
            showPreviousIcon={showPreviousIcon}
            showShareIcon={showShareIcon}
          />
        )}
      </div>

      <div className="pt-14">{children}</div>
    </>
  );
};

export default Header;

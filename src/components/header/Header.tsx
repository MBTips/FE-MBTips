import { useLocation } from "react-router-dom";
import SubHeader from "@/components/header/SubHeader";
import MainHeader from "@/components/header/MainHeader";
import useAuthStore from "@/store/useAuthStore";

type HeaderProps = {
  title?: string;
  showPreviousIcon?: boolean;
  showShareIcon?: boolean;
};

const Header = ({
  title = "",
  showPreviousIcon = true,
  showShareIcon = true
}: HeaderProps) => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuthStore();
  const isHomepage = pathname === "/";

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white lg:w-[500px]">
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
    </>
  );
};

export default Header;

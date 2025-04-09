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
  showPreviousIcon = false,
  showShareIcon = false
}: HeaderProps) => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuthStore();
  
  return pathname === "/" ? <MainHeader isLoggedIn={isLoggedIn}/> : <SubHeader title={title} showPreviousIcon={showPreviousIcon} showShareIcon={showShareIcon} />;
};

export default Header;
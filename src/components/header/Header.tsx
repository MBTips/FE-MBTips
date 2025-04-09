import { useLocation } from "react-router-dom";
import MainHeader from "./MainHeader";
import SubHeader from "./SubHeader";

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
  const pathname = useLocation().pathname;
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  return pathname === "/" ? <MainHeader isLoggedIn={isLoggedIn}/> : <SubHeader title={title} showPreviousIcon={showPreviousIcon} showShareIcon={showShareIcon} />;
};

export default Header;
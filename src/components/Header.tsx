import { useLocation } from "react-router-dom";
import SubHeader from "./header/SubHeader";
import MainHeader from "./header/MainHeader";

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
  const pathname = useLocation().pathname;
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  

  return pathname === "/" ? <MainHeader isLoggedIn={isLoggedIn}/> : <SubHeader title={title} showPreviousIcon={showPreviousIcon} showShareIcon={showShareIcon} />;
};

export default Header;

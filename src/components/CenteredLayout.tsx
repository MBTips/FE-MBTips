import { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
}

const CenteredLayout = ({ children }: CenteredLayoutProps) => (
  <div className="flex w-screen justify-center bg-gray-50">
    <div className="flex w-full justify-center">{children}</div>
  </div>
);

export default CenteredLayout;

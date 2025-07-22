import { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
}

const CenteredLayout = ({ children }: CenteredLayoutProps) => (
  <div className="flex min-h-screen w-screen justify-center bg-gray-50">
    <div className="flex w-full flex-col bg-white lg:w-[500px] ">
      {children}
    </div>
  </div>
);

export default CenteredLayout;

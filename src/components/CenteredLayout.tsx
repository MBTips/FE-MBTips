import { ReactNode } from 'react';

interface CenteredLayoutProps {
  children: ReactNode;
}

const CenteredLayout = ({ children }: CenteredLayoutProps) => (
  <div className="flex justify-center w-screen">
    <div className="w-full flex justify-center">
      {children}
    </div>
  </div>
);

export default CenteredLayout;

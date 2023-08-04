// import { Button } from 'components/common';
import React from 'react';

interface NavBarProps {
  children?: React.ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <div>
      {/* <Button label="test" {...props} /> */}
      {children}
    </div>
  );
};

export default NavBar;

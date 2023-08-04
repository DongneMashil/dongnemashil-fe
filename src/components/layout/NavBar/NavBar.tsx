import React from 'react';

interface NavBarProps {
  children?: React.ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return <div>{children}</div>;
};

export default NavBar;

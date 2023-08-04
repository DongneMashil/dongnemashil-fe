import React from 'react';
import { styled } from 'styled-components';

interface CommonLayoutProps {
  children: React.ReactNode;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <LayoutOuter>
      <LayoutInner>{children}</LayoutInner>
    </LayoutOuter>
  );
};

export const LayoutOuter = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const LayoutInner = styled.div`
  width: 100vw;
  max-width: 390px;
  min-height: 100vh;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  border-radius: 1rem;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

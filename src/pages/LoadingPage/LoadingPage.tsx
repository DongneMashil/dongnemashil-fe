import React from 'react';
import { StLoadingContainer } from 'pages/LoadingPage/LoadingPage.styles';
import { StLoadingSpinner } from 'components/common';

export const LoadingPage = () => {
  return (
    <StLoadingContainer>
      <StLoadingSpinner />
    </StLoadingContainer>
  );
};

export default LoadingPage;
